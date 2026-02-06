import React from 'react';
import {ContactModalTrigger} from "@/app/components/ContactModal";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-on-mount-right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Перевозка лежачих больных и инвалидов в{" "}
              <span className="text-blue-600">Евпатории</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              <strong>Специализированный транспорт</strong> с медоборудованием и{" "}
              <strong>профессиональной бригадой</strong>. Бережно, как дома, даже
              в дороге.
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              Здоровье и покой близкого человека — главная ценность. Мы понимаем,
              насколько сложной и ответственной может быть транспортировка
              лежачего больного. Наша компания в{" "}
              <strong>Евпатории</strong> предоставляет полный комплекс услуг по
              перевозке пациентов, делая этот процесс максимально безопасным и
              комфортным.
            </p>
            <div className="flex flex-col gap-6 mt-6">
              <ContactModalTrigger />
              <a
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg w-full md:w-fit"
                aria-label="Задать вопрос в Telegram"
              >
                Задать вопрос в Telegram
                <img
                  src="/icon-tg.svg"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="icon-blue"
                />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 animate-on-mount-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
              <div className="relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/peugeot.jpg"
                  alt="Специализированный медицинский транспорт для перевозки лежачих больных в Евпатории"
                  fill
                  className="object-cover object-center lg:object-[center_30%]"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                />
                {/* Gradient overlay для лучшей интеграции */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};