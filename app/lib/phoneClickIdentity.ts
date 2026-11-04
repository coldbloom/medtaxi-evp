import { createId } from "./trackingSession";

// Both independent capture listeners receive the same event object, in any order.
const clicks = new WeakMap<MouseEvent, { eventId: string }>();

export function phoneClickIdentity(click: MouseEvent): { eventId: string } {
  let identity = clicks.get(click);
  if (!identity) {
    identity = { eventId: createId() };
    clicks.set(click, identity);
  }
  return identity;
}
