"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useContactModalController } from "../useContactModalController";

const ContactModal = dynamic(
  () => import("@/app/components/ContactModal/ContactModal").then((module) => module.ContactModal),
  { ssr: false },
);

// Компонент-триггер для открытия модалки
export function ContactModalTrigger() {
  const { isOpen, hasOpened, open, close } = useContactModalController();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={open}
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
      {hasOpened && <ContactModal isOpen={isOpen} onClose={close} />}
    </>
  );
}
