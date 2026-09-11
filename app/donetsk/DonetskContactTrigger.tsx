type DonetskContactTriggerProps = {
  className?: string;
  label?: string;
  ctaPosition: string;
};

export function DonetskContactTrigger({
  className = "",
  label = "Заказать обратный звонок",
  ctaPosition,
}: DonetskContactTriggerProps) {
  return (
    <button
      type="button"
      className={className}
      data-donetsk-goal="donetsk_callback_open"
      data-cta-position={ctaPosition}
      aria-haspopup="dialog"
    >
      {label}
    </button>
  );
}
