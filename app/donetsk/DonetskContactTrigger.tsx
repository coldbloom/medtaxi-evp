import { ContactActionIcon } from "./components/ContactActionIcon";

type DonetskContactTriggerProps = {
  className?: string;
  label?: string;
  ctaPosition: string;
  mode?: "callback" | "messenger";
};

export function DonetskContactTrigger({
  className = "",
  label,
  ctaPosition,
  mode = "callback",
}: DonetskContactTriggerProps) {
  return (
    <button
      type="button"
      className={className}
      data-donetsk-goal={mode === "messenger" ? "donetsk_contact_open" : "donetsk_callback_open"}
      data-cta-position={ctaPosition}
      aria-haspopup="dialog"
    >
      {mode === "messenger" && <ContactActionIcon kind="message" />}
      {label ?? (mode === "messenger" ? "Написать нам" : "Заказать обратный звонок")}
    </button>
  );
}
