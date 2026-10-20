import type { ComponentType } from "react";
import type { ContactModalProps } from "./ContactModal";

type ModalComponent = ComponentType<ContactModalProps>;
let loaded: ModalComponent | null = null;
let pending: Promise<ModalComponent> | undefined;

export function getLoadedContactModal() {
  return loaded;
}

/** Share one request across triggers; a failed chunk can be requested again. */
export function loadContactModal(): Promise<ModalComponent> {
  if (loaded) return Promise.resolve(loaded);
  if (!pending) {
    pending = import("./ContactModal")
      .then((module) => {
        loaded = module.ContactModal;
        return loaded;
      })
      .catch((error: unknown) => {
        pending = undefined;
        throw error;
      });
  }
  return pending;
}
