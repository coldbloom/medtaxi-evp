'use client';

import Image from "next/image";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './Menu.module.scss';
import { DonetskRouteLink } from '@/app/donetsk/components/DonetskRouteLink';

type WithOnCloseProps = {
  onCloseAction: () => void;
  titleId: string;
};

const pages = [
  { title: 'Главная', href: '/' },
  { title: 'Цены', href: '/prices' },
  { title: 'Перевозка больных в Донецке', href: '/donetsk' },
  { title: 'Перевозка из Донецка в Москву', href: '/donetsk/moskva' },
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

export const Menu = ({ onCloseAction, titleId }: WithOnCloseProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = (href: string) => {
    if (pathname === href) {
      onCloseAction();
    }
    // если страница другая — ничего не делаем, навигация закроет меню сама
  };

  return (
    <div className={s.modalWrapper}>
      <div className={s.tabsWrapper}>
        <div className={s.menuHeader}>
          <div>
            <p className={s.menuEyebrow}>Навигация</p>
            <h2 id={titleId} className={s.menuTitle}>Меню сайта</h2>
          </div>
          <button type="button" onClick={onCloseAction} className={s.closeButton} aria-label="Закрыть меню">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {pages.slice(0, 4).map((page) => (
          page.href === '/donetsk' || page.href === '/donetsk/moskva' ? (
            <DonetskRouteLink key={page.href} href={page.href} prefetch className={s.tabLink} onClick={() => handleLinkClick(page.href)}>
              {page.title}
            </DonetskRouteLink>
          ) : (
            <Link key={page.href} href={page.href} className={s.tabLink} onClick={() => handleLinkClick(page.href)}>
              {page.title}
            </Link>
          )
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
            <Image src="/chevron.svg" alt="" width={20} height={20} className={s.chevronIcon} />
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

        {pages.slice(4).map((page) => (
          <Link key={page.href} href={page.href} className={s.tabLink} onClick={() => handleLinkClick(page.href)}>
            {page.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
