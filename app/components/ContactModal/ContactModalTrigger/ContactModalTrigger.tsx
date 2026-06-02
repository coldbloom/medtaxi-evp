"use client";

import { useState } from "react";
import Image from "next/image";
import { ContactModal } from "../ContactModal";

// Компонент-триггер для открытия модалки
export function ContactModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row gap-2 items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg w-full md:w-fit"
      >
        Заказать обратный звонок
        <Image
          src="/icon-arrow.svg"
          alt="Иконка стрелки"
          width={16}
          height={16}
        />
      </button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}