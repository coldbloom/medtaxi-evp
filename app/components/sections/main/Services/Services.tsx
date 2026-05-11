import React from 'react';
import AnimateOnScroll from "@/app/components/AnimateOnScroll";
import { HeadingSection } from '@/app/components/sections/HeadingSection';

export const Services = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll direction="up">
          <HeadingSection>Наши услуги</HeadingSection>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimateOnScroll direction="up" delay={0}>
            <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Перевозка из больниц
              </h3>
              <p className="text-gray-600">
                <strong>Перевозка лежачих больных</strong> из больниц, домов и
                пансионатов в <strong>Евпатории</strong> и по{" "}
                <strong>Крыму</strong>.
              </p>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={100}>
            <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
              <div className="text-4xl mb-4">♿</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Транспортировка инвалидов
              </h3>
              <p className="text-gray-600">
                <strong>Транспортировка инвалидов-колясочников</strong> и
                маломобильных граждан с полным комфортом.
              </p>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={200}>
            <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
              <div className="text-4xl mb-4">🚑</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Санитарный транспорт
              </h3>
              <p className="text-gray-600">
                <strong>Санитарный транспорт по Крыму</strong> и{" "}
                <strong>междугородние перевозки по России</strong>.
              </p>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={300}>
            <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Поездки на обследования
              </h3>
              <p className="text-gray-600">
                Поездки на обследования, процедуры и в реабилитационные центры
                в <strong>Евпатории</strong> и за её пределами.
              </p>
            </article>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};