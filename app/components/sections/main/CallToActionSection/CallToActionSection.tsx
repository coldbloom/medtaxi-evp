import React from 'react';
import Image from "next/image";

export const CallToActionSection = () => {
  return (
    <section className="py-16 px-4 bg-blue-600 text-white">
      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
        <div className="flex items-center justify-center pb-8 md:w-[128px] md:h-[128px] w-[96px] h-[96px]">
          <Image
            src="/24:7.svg"
            alt="Круглосуточная работа 24/7 — Медтакси Евпатория"
            width={10}
            height={10}
            priority
            className="w-auto h-auto"
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Готовы помочь прямо сейчас
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Звоните круглосуточно. Мы ответим на все вопросы и организуем
          перевозку в кратчайшие сроки.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap">
          <a
            href="tel:+79789380221"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Позвонить по телефону +79789380221"
          >
            +7 (978) 938-02-21
          </a>
          <a
            href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Написать в Telegram"
          >
            Задать вопрос в Telegram
          </a>
        </div>
        <div className="flex gap-4 items-center justify-center mt-6">
          <a
            href="https://max.ru/u/f9LHodD0cOI7hGFwnp4y8CBCeTVIs3kkyT-JqLq2wJc3ES2VjFOgy02xevs"
            className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Написать в Max"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/max-icon.svg"
              alt="Max"
              width={24}
              height={24}
              className="icon-blue"
            />
          </a>
          <a
            href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
            className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Написать в Telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icon-tg.svg"
              alt="Telegram"
              width={24}
              height={24}
              className="icon-blue"
            />
          </a>
          <a
            href="https://wa.me/79789380221?text=Здравствуйте"
            className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Написать в Whats App"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icon-whatsapp.svg"
              alt="Whats App"
              width={24}
              height={24}
              className="icon-blue"
            />
          </a>
          <a
            href="https://vk.com/club235608829"
            className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Написать в VK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icon-vk.svg"
              alt="VK"
              width={24}
              height={24}
              className="icon-blue"
            />
          </a>
        </div>
      </div>
    </section>
  );
};