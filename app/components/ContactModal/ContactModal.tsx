'use client';

import Image from 'next/image';
import {useState} from 'react';
import Modal from './Modal/Modal';
// import { LineSection } from '../Line/Line';
import './ContactModal.scss';

export const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="НАШИ КОНТАКТЫ" maxWidth="lg">
      <div className="contact-modal__content">
        <div className="contact-modal__contact-list">
          <div className="contact-modal__contact-list-item">
            <Image src="/images/icons/icon-phone.svg" alt="phone number" width={33} height={33} loading="lazy" />
            <div className="contact-modal__contact-list-block">
              <h3 className="contact-modal__contact-list-title">
                <a href="tel:+79037342796">+7 (903) 734-27-96</a>
              </h3>
              <p className="contact-modal__contact-list-description">Затолочный Денис Владимирович — Президент ФКБМ</p>
            </div>
          </div>

          {/*<LineSection />*/}

          <div className="contact-modal__contact-list-item">
            <div className="contact-modal__telegram-icon-wrapper">
              <Image
                src="/images/icons/icon-tg.svg"
                alt="telegram"
                width={20}
                height={20}
                loading="lazy"
                className="contact-modal__telegram-icon"
              />
            </div>
            <div className="contact-modal__contact-list-block">
              <h3 className="contact-modal__contact-list-title">
                <a href="https://t.me/fightpass" target="_blank" rel="noopener noreferrer">
                  @fightpass
                </a>
              </h3>
              <p className="contact-modal__contact-list-description">
                Серебреников Эмилио Руфатович Вице-президент ФКБМ
              </p>
            </div>
          </div>

          {/*<LineSection />*/}

          <div className="contact-modal__contact-list-item">
            <Image src="/images/icons/icon-mail.svg" alt="email" width={33} height={33} loading="lazy" />
            <div className="contact-modal__contact-list-block">
              <h3 className="contact-modal__contact-list-title">
                <a href="mailto:KKboxing.moscow@yandex.ru">KKboxing.moscow@yandex.ru</a>
              </h3>
              <p className="contact-modal__contact-list-description">Сотрудничество и партнёрства</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row gap-2 justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg w-full md:w-fit"
      >
        Заказать обратный звонок
        <Image src="/icon-arrow.svg" alt="Иконка стрелки" width={16} height={16} />
      </button>
    </Modal>
  );
};
