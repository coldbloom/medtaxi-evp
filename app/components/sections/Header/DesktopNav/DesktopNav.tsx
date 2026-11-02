'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'clsx';
import s from './DesktopNav.module.scss';
import { DonetskRouteLink } from '@/app/donetsk/components/DonetskRouteLink';

const pages = [
  { title: 'Главная', href: '/' },
  { title: 'Цены', href: '/prices' },
  { title: 'Донецк', href: '/donetsk' },
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

type DesktopNavProps = {
  services: readonly { title: string; href: string }[];
};

export const DesktopNav = ({ services }: DesktopNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={s.desktopNav} aria-label="Основная навигация">
      <ul className={s.mainList}>
        {pages.map((page) => (
          <li key={page.href}>
            {page.href === '/donetsk' || page.href === '/donetsk/moskva' ? (
              <DonetskRouteLink
                href={page.href}
                prefetch
                className={cn(s.navLink, pathname === page.href && s.activeLink)}
                aria-current={pathname === page.href ? 'page' : undefined}
              >
                {page.title}
              </DonetskRouteLink>
            ) : (
              <Link
                href={page.href}
                className={cn(s.navLink, pathname === page.href && s.activeLink)}
                aria-current={pathname === page.href ? 'page' : undefined}
              >
                {page.title}
              </Link>
            )}
          </li>
        ))}

        <li className={s.dropdownItem}>
          <details
            className={s.dropdown}
            onMouseEnter={(event) => { event.currentTarget.open = true; }}
            onMouseLeave={(event) => {
              if (!event.currentTarget.contains(event.currentTarget.ownerDocument.activeElement)) {
                event.currentTarget.open = false;
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
            }}
            onKeyDown={(event) => {
              if (event.key !== 'Escape') return;
              event.currentTarget.open = false;
              event.currentTarget.querySelector('summary')?.focus();
            }}
          >
            <summary className={cn(s.dropdownTrigger, pathname.startsWith('/uslugi/') && s.activeLink)}>
              Услуги
              <span className={s.chevron} aria-hidden="true">▾</span>
            </summary>
            <div className={s.dropdownMenu}>
              {[...servicesPages, ...services].map((service) => (
                <Link
                  key={`${service.href}-${service.title}`}
                  href={service.href}
                  className={cn(s.dropdownLink, pathname === service.href && s.activeDropdownLink)}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </details>
        </li>
      </ul>
    </nav>
  );
};
