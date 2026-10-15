import type { ContactModalVariant } from "./types";

interface ContactResultProps {
  descriptionId: string;
  variant: ContactModalVariant;
  result: "connected" | "sent";
  onClose: () => void;
}

export function ContactResult({ descriptionId, variant, result, onClose }: ContactResultProps) {
  return (
    <div className="overflow-y-auto p-5 sm:p-6">
      <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-green-50 text-green-700" aria-hidden="true">
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg>
      </div>
      <p id={descriptionId} role="status" className="text-base leading-relaxed text-gray-600">
        {result === "sent" ? "Мы получили вашу заявку и перезвоним вам по указанному номеру. Пожалуйста, держите телефон под рукой." : "Рады, что вы смогли с нами связаться. Ваш ответ помогает нам делать сервис удобнее."}
      </p>
      <button type="button" onClick={onClose} className={`mt-6 min-h-12 w-full rounded-xl px-4 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variant === "donetsk" ? "bg-[#f3b941] text-[#14221e] hover:bg-[#ffd06d] focus-visible:ring-[#2f6757]" : "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500"}`}>Закрыть</button>
    </div>
  );
}
