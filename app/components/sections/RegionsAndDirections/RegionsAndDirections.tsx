import React from 'react';
import {HeadingSection} from "@/app/components/sections/HeadingSection";

export const RegionsAndDirections = () => {
  return (
    <section className="py-16 px-4 bg-gray-50" aria-labelledby="areas-heading">
      <div className="container mx-auto max-w-4xl">
        <HeadingSection tag="h2" id="areas-heading">Перевозка лежачих больных в <span className="text-blue-600">Евпатории</span> и по <span className="text-blue-600">Крыму</span></HeadingSection>
        <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
          Работаем по <strong>Евпатории</strong> (все районы), выезжаем в <strong>Симферополь</strong>, <strong>Севастополь</strong>, <strong>Ялту</strong>, <strong>Алушту</strong>, <strong>Феодосию</strong>, <strong>Керчь</strong> и другие города Крыма. Организуем междугородние перевозки лежачих больных в <strong>Москву</strong>, <strong>Санкт-Петербург</strong> и по России.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Евпатория</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Саки</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Уютное</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Симферополь</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Севастополь</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Ялта</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Алушта</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Феодосия</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Керчь</span>
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">междугородние перевозки</span>
        </div>
      </div>
    </section>
  );
};