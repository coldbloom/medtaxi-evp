import type { ContactModalVariant } from "./types";

interface CallOutcomeQuestionProps {
  descriptionId: string;
  variant: ContactModalVariant;
  onConnected: () => void;
  onCallback: () => void;
}

export function CallOutcomeQuestion({ descriptionId, variant, onConnected, onCallback }: CallOutcomeQuestionProps) {
  const isDonetsk = variant === "donetsk";
  return (
    <div className="overflow-y-auto p-5 sm:p-6">
      <div className={`mb-5 flex size-14 items-center justify-center rounded-2xl ${isDonetsk ? "bg-[#e8f1ec] text-[#245445]" : "bg-blue-50 text-blue-600"}`} aria-hidden="true">
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <p id={descriptionId} className="text-base leading-relaxed text-gray-600">Мы хотим сделать наш сервис лучше и удобнее для вас.</p>
      <p className="mt-3 text-base font-medium leading-relaxed text-gray-900">Если связаться не получилось, оставьте номер — мы сами вам перезвоним.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onConnected} className="min-h-12 flex-1 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Да, дозвонились</button>
        <button type="button" onClick={onCallback} className={`min-h-12 flex-1 rounded-xl px-4 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDonetsk ? "bg-[#f3b941] text-[#14221e] hover:bg-[#ffd06d] focus-visible:ring-[#2f6757]" : "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500"}`}>Нет, не удалось</button>
      </div>
    </div>
  );
}
