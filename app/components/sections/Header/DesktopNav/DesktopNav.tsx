'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import cn from 'clsx';
import s from './DesktopNav.module.scss';
import { serviceOffers } from '@/app/lib/serviceOffers';

const pages = [
  { title: 'Главная', href: '/' },
  { title: 'Цены', href: '/prices' },
  { title: 'Контакты', href: '/contacts' },
];

const servicesPages = [
  {
    title: 'Из больницы домой',
    href: '/uslugi/perevozka-iz-bolnitsy-domoj',
  },
  {
    title: 'Инвалиды-колясочники',
    href: '/uslugi/perevozka-invalidov-kolyasochnikov',
  },
  { title: 'Междугородние перевозки', href: '/uslugi/mezhdugorodnye-perevozki' },
];

const generatedServicesPages = serviceOffers.map((offer) => ({
  title: offer.shortName,
  href: offer.route,
}));

export const DesktopNav = () => {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className={s.desktopNav} aria-label="Основная навигация">
      <ul className={s.mainList}>
        {pages.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              className={cn(s.navLink, pathname === page.href && s.activeLink)}
              aria-current={pathname === page.href ? 'page' : undefined}
            >
              {page.title}
            </Link>
          </li>
        ))}

        <li
          className={s.dropdownItem}
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <button
            type="button"
            className={cn(
              s.dropdownTrigger,
              pathname.startsWith('/uslugi/') && s.activeLink,
              isServicesOpen && s.dropdownTriggerOpen,
            )}
            aria-expanded={isServicesOpen}
            aria-haspopup="menu"
            onClick={() => setIsServicesOpen((prev) => !prev)}
          >
            Услуги
            <span className={cn(s.chevron, isServicesOpen && s.chevronOpen)} aria-hidden="true">▾</span>
          </button>

          {isServicesOpen && (
            <div className={s.dropdownMenu} role="menu">
              {[...servicesPages, ...generatedServicesPages].map((service) => (
                <Link
                  key={`${service.href}-${service.title}`}
                  href={service.href}
                  className={cn(s.dropdownLink, pathname === service.href && s.activeDropdownLink)}
                  role="menuitem"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};
