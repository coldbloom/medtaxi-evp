import React from "react";
import { ReviewsCarousel } from "./ReviewsCarousel";

export interface ReviewItem {
  text: string;
  author: string;
}

const reviews: ReviewItem[] = [
  {
    text:
      "Очень благодарны за помощь в перевозке мамы из больницы в Евпатории домой. Водитель Виталий внимательным, машина чистая, всё прошло быстро и аккуратно. Рекомендую!",
    author: "Мария, Евпатория",
  },
  {
    text:
      "Нужно было перевезти отца из Симферополя в Евпаторию. Спасибо за профессиональный подход и бережное отношение Виталию и Антону! Всё организовали под ключ, мы были спокойны за здоровье близкого человека.",
    author: "Иван, Симферополь",
  },
  {
    text:
      "Перевозили бабушку на обследование в Симферополь. Очень довольны сервисом: комфортная машина, опытный водитель, всё вовремя. Обязательно обратимся снова!",
    author: "Анна, Севастополь",
  },
];

export const Reviews = () => {
  return (
    <section className="py-16 px-4 bg-gray-50" aria-labelledby="reviews-heading">
      <div className="container mx-auto max-w-6xl">
        <h2
          id="reviews-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Отзывы наших клиентов
        </h2>
        <ReviewsCarousel items={reviews} />
        <div className="mt-12 text-center p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-4">
            Остались вопросы? Напишите нам в Telegram — ответим быстро.
          </p>
          <a
            href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2 items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-2 md:px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg w-full md:w-fit"
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
    </section>
  );
};
