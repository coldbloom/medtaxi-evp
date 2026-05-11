'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './Menu.module.scss';

type WithOnCloseProps = {
  onCloseAction: () => void;
};

const pages = [
  { title: 'Главная', href: '/' },
  { title: 'Цены', href: '/prices' },
  { title: 'Контакты', href: '/contacts' }
];

const servicesPages = [
  {
    title: 'Перевозка лежачих больных из больницы домой',
    href: '/uslugi/perevozka-iz-bolnitsy-domoj'
  },
  {
    title: 'Перевозка инвалидов-колясочников',
    href: '/uslugi/perevozka-invalidov-kolyasochnikov'
  },
  { title: 'Междугородние перевозки', href: '/uslugi/mezhdugorodnye-perevozki' }
];

export const Menu = ({ onCloseAction }: WithOnCloseProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = (href: string) => {
    console.log('pathname = ', pathname)
    console.log('href = ', href)
    if (pathname === href) {
      onCloseAction();
    }
    // если страница другая — ничего не делаем, навигация закроет меню сама
  };

  return (
    <div className={s.modalWrapper}>
      <div className={s.tabsWrapper}>
        <div className={s.menuHeader}>
          <p className={s.menuEyebrow}>Навигация</p>
          <h3 className={s.menuTitle}>Меню сайта</h3>
        </div>

        {pages.slice(0, 2).map((page) => (
          <Link key={page.href} href={page.href} className={s.tabLink} onClick={() => handleLinkClick(page.href)}>
            {page.title}
          </Link>
        ))}

        <button
          type="button"
          className={s.servicesButton}
          onClick={() => setIsServicesOpen((prev) => !prev)}
          aria-expanded={isServicesOpen}
          aria-controls="services-menu"
        >
          <span>Услуги</span>
          <span className={isServicesOpen ? s.chevronOpen : s.chevron} aria-hidden="true">
            <img src="/chevron.svg" alt="" className={s.chevronIcon} />
          </span>
        </button>

        {isServicesOpen && (
          <div id="services-menu" className={s.servicesList}>
            {servicesPages.map((service) => (
              <Link
                key={service.href + service.title}
                href={service.href} className={s.subTabLink}
                onClick={() => handleLinkClick(service.href)}
              >
                {service.title}
              </Link>
            ))}
          </div>
        )}

        {pages.slice(2).map((page) => (
          <Link key={page.href} href={page.href} className={s.tabLink} onClick={() => handleLinkClick(page.href)}>
            {page.title}
          </Link>
        ))}
      </div>
    </div>
  );
};