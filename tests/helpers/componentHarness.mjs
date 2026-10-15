import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

/** Load the real local dependency graph; mock only browser/framework adapters. */
export function moduleLoader({ mocks = {}, globals = {} } = {}) {
  const cache = new Map();
  const context = vm.createContext({ console, AbortController, ...globals });
  const loadedFiles = new Set();

  function resolveFile(name, parent = process.cwd()) {
    const base = name.startsWith("@/")
      ? path.resolve(process.cwd(), name.slice(2))
      : path.resolve(parent, name);
    const candidates = /\.[cm]?[jt]sx?$/.test(base)
      ? [base]
      : [`${base}.tsx`, `${base}.ts`, `${base}.js`, path.join(base, "index.tsx"), path.join(base, "index.ts")];
    const file = candidates.find(existsSync);
    if (!file) throw new Error(`Cannot resolve ${name} from ${parent}`);
    return file;
  }

  function load(file) {
    file = resolveFile(file);
    if (cache.has(file)) return cache.get(file).exports;
    const compiledModule = { exports: {} };
    cache.set(file, compiledModule);
    loadedFiles.add(file);
    const code = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    const localRequire = (name) => {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === "react-hot-toast") throw new Error("Contact dialogs must not create additional global toast renderers");
      if (name.endsWith(".module.css")) return { __esModule: true, default: { viewport: "viewport", form: "form" } };
      if (name.startsWith(".") || name.startsWith("@/")) return load(resolveFile(name, path.dirname(file)));
      return require(name);
    };
    const wrapper = vm.runInContext(`(function(exports, require, module) {\n${code}\n})`, context, { filename: file });
    wrapper(compiledModule.exports, localRequire, compiledModule);
    return compiledModule.exports;
  }

  return { load, loadedFiles };
}

/**
 * A small hook renderer for event-driven component tests without a DOM dependency.
 * Each real component has its own hook state; effects rerun/clean up on dependency
 * changes and unmount. It deliberately does not emulate React's browser layout.
 */
export function hookRenderer({ createHost = () => ({}), afterRender = () => {} } = {}) {
  const instances = new Map();
  const typeIds = new WeakMap();
  let nextTypeId = 0;
  let current;
  let dirty = false;
  let tree;
  let root;
  let rootProps;
  let effects = [];
  let hostNodes = [];

  function slot(initial) {
    if (!current) throw new Error("Hook used outside a rendered component");
    const index = current.cursor++;
    if (!(index in current.hooks)) current.hooks[index] = initial();
    return current.hooks[index];
  }
  const sameDeps = (a, b) => a && b && a.length === b.length && a.every((value, index) => Object.is(value, b[index]));
  const react = {
    useState(initial) {
      const item = slot(() => ({ value: typeof initial === "function" ? initial() : initial }));
      return [item.value, (value) => {
        const next = typeof value === "function" ? value(item.value) : value;
        if (!Object.is(next, item.value)) { item.value = next; dirty = true; }
      }];
    },
    useRef(initial) { return slot(() => ({ current: initial })); },
    useId() {
      const owner = current;
      return slot(() => ({ value: `test-${owner.id}-${owner.cursor}` })).value;
    },
    useEffect(effect, dependencies) {
      const item = slot(() => ({}));
      if (!sameDeps(item.dependencies, dependencies)) {
        item.dependencies = dependencies;
        effects.push({ item, effect, depth: current.depth });
      }
    },
    useMemo(factory, dependencies) {
      const item = slot(() => ({}));
      if (!sameDeps(item.dependencies, dependencies)) {
        item.dependencies = dependencies;
        item.value = factory();
      }
      return item.value;
    },
    useCallback(callback, dependencies) { return react.useMemo(() => callback, dependencies); },
  };

  function expand(node, position, seen, depth = 0) {
    if (Array.isArray(node)) return node.map((child, index) => expand(child, `${position}.${index}`, seen, depth));
    if (!node || typeof node !== "object" || !node.props) return node;
    if (typeof node.type === "function") {
      if (!typeIds.has(node.type)) typeIds.set(node.type, ++nextTypeId);
      const id = `${position}:${typeIds.get(node.type)}`;
      let instance = instances.get(id);
      if (!instance) { instance = { id, hooks: [] }; instances.set(id, instance); }
      instance.cursor = 0;
      instance.depth = depth;
      seen.add(id);
      const previous = current;
      current = instance;
      let output;
      try { output = node.type(node.props); } finally { current = previous; }
      return expand(output, `${position}.component`, seen, depth + 1);
    }
    if (typeof node.type === "symbol") return expand(node.props.children, `${position}.fragment`, seen, depth);
    const children = expand(node.props.children, `${position}.children`, seen, depth);
    const host = { type: node.type, props: { ...node.props, children } };
    const element = createHost(host, position);
    hostNodes.push({ ...host, element, position });
    if (typeof node.props.ref === "function") node.props.ref(element);
    else if (node.props.ref) node.props.ref.current = element;
    return host;
  }

  function render(Component = root, props = rootProps) {
    root = Component;
    rootProps = props;
    for (let iteration = 0; iteration < 30; iteration++) {
      dirty = false;
      effects = [];
      hostNodes = [];
      const seen = new Set();
      tree = expand({ type: root, props: rootProps }, "root", seen);
      for (const [id, instance] of instances) {
        if (!seen.has(id)) {
          for (const item of instance.hooks) item.cleanup?.();
          instances.delete(id);
        }
      }
      afterRender(hostNodes);
      for (const { item, effect } of effects.sort((a, b) => b.depth - a.depth)) {
        item.cleanup?.();
        item.cleanup = effect();
      }
      if (!dirty) return tree;
    }
    throw new Error("Component did not stabilize after effect updates");
  }

  function unmount() {
    for (const instance of instances.values()) for (const item of instance.hooks) item.cleanup?.();
    instances.clear();
    tree = null;
    afterRender([]);
  }
  return { react, render, unmount, tree: () => tree, hosts: () => hostNodes };
}

export function nodes(tree) {
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  if (!tree || typeof tree !== "object" || !tree.props) return [];
  return [tree, ...nodes(tree.props.children)];
}

export function textContent(tree) {
  if (Array.isArray(tree)) return tree.map(textContent).join("");
  if (typeof tree === "string" || typeof tree === "number") return String(tree);
  return tree?.props ? textContent(tree.props.children) : "";
}

export function eventTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(callback);
    },
    removeEventListener(name, callback) {
      listeners.get(name)?.delete(callback);
      if (listeners.get(name)?.size === 0) listeners.delete(name);
    },
    dispatch(name, event = {}) {
      for (const callback of [...(listeners.get(name) || [])]) callback(event);
    },
  };
}

export function browserFixture({ visualViewport = true } = {}) {
  const scrollCalls = [];
  const focusCalls = [];
  const properties = new Map();
  const originalStyle = { overflow: "auto", position: "relative", top: "2px", left: "3px", width: "95%", background: "white" };
  const document = { ...eventTarget(), body: { style: { ...originalStyle } }, activeElement: null };
  const viewport = { ...eventTarget(), height: 740, offsetTop: 0 };
  const window = {
    scrollX: 4, scrollY: 1234,
    location: { pathname: "/" },
    visualViewport: visualViewport ? viewport : undefined,
    scrollTo: (options) => scrollCalls.push({ ...options }),
  };
  let visibleHosts = [];
  const elements = new Map();
  function focusable(name) {
    return {
      isConnected: true,
      offsetParent: {},
      focus(options) {
        focusCalls.push({ name, options: options && { ...options } });
        document.activeElement = this;
      },
    };
  }
  const trigger = focusable("trigger");
  document.activeElement = trigger;
  function createHost(node, position) {
    let element = elements.get(position);
    if (!element) {
      element = {
        ...focusable(node.props["aria-label"] || node.props.name || textContent(node) || node.type),
        style: { setProperty: (name, value) => properties.set(name, value) },
        querySelectorAll: () => visibleHosts.filter((host) => {
          const { type, props } = host;
          return host.position.startsWith(position) && !props.disabled
            && (["button", "input", "textarea"].includes(type)
              || (type === "a" && props.href && props.tabIndex !== -1 && ![true, "true"].includes(props["aria-disabled"])));
        }).map((host) => host.element),
      };
      elements.set(position, element);
    }
    return element;
  }
  return {
    document, window, viewport, trigger, originalStyle, properties, scrollCalls, focusCalls,
    createHost,
    afterRender(hosts) { visibleHosts = hosts; },
    element(predicate) { return visibleHosts.find(predicate)?.element; },
  };
}
