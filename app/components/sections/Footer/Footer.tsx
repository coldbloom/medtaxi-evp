import React from 'react';
import Link from 'next/link';
import { CodeCake } from "@/app/components/CodeCake";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Медтакси Евпатория</h3>
            <p className="text-gray-400">
              Перевозка <strong>лежачих больных и инвалидов</strong> в{" "}
              <strong>Евпатории</strong>, по <strong>Крыму</strong> и всей{" "}
              <strong>России</strong>.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <p className="text-gray-400 mb-2">
              <strong>Телефон:</strong>{" "}
              <TrackedPhoneLink
                phone="+79789380221"
                trackingId="footer"
                className="text-blue-400 hover:text-blue-300"
              >
                +7 (978) 938-02-21
              </TrackedPhoneLink>
            </p>
            <p className="text-gray-400">
              <strong>Регион:</strong> <strong>Евпатория</strong>,{" "}
              <strong>Крым</strong>, Россия
            </p>
            <p className="text-gray-400 mt-2">
              Работаем <strong>24/7</strong>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Услуги</h3>
            <ul className="text-gray-400 space-y-2">
              <li>• Перевозка лежачих больных</li>
              <li>• Транспортировка инвалидов</li>
              <li>• Санитарный транспорт</li>
              <li>• Междугородние перевозки</li>
              <li>
                •{' '}
                <Link href="/donetsk" className="transition-colors hover:text-white">
                  Перевозка больных в Донецке
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Медтакси Евпатория. Все права
            защищены.
          </p>
          <p className="mt-2 text-sm">Услуга по перевозке не является скорой медицинской помощью.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="/privacy" className="underline underline-offset-4 transition-colors hover:text-white">
              Политика обработки персональных данных
            </Link>
            <Link href="/personal-data-consent" className="underline underline-offset-4 transition-colors hover:text-white">
              Согласие на обработку персональных данных
            </Link>
          </div>
        </div>
        <div className="w-full pt-16 pb-4 flex items-center justify-center">
          <CodeCake />
        </div>
      </div>
    </footer>
  );
};
