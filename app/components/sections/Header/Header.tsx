import Image from "next/image";
import { RunningLine } from "@/app/components/sections/Header/RunningLine";
import s from './Header.module.scss';
import cn from "clsx";

export const Header = () => {
  return (
    <div className="sticky top-0 z-30">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 w-[40px] md:w-[60px]">
              <Image
                src="/logo.svg"
                alt="Медтакси Евпатория - Логотип"
                width={10}
                height={10}
                priority
                className="w-auto h-auto"
              />
              <h2 className="text-lg font-bold text-blue-600">
                Медтакси Евпатория
              </h2>
            </div>
            <div className={s.iconsWrapper}>
              <a href="https://max.ru/u/f9LHodD0cOI7hGFwnp4y8CBCeTVIs3kkyT-JqLq2wJc3ES2VjFOgy02xevs" className={cn(s.link, s.maxColor)}>
                <img src="/max-icon.svg" alt="" className={s.icon} />
              </a>
              <a href="https://t.me/konstankk" className={cn(s.link, s.tgColor)}>
                <img src="/tg-icon.svg" alt="" className={s.icon} />
              </a>
              <a href="tel:+79895052785" className={cn(s.link, s.phoneColor, s.phoneIconMobile)}>
                <img src="/phone-icon.svg" alt="" className={s.icon} />
              </a>
              <a
                href="tel:+79895052785"
                className={s.phoneTextDesktop}
                aria-label="Позвонить по телефону +79895052785"
              >
                +7 (989) 505-27-85
              </a>
            </div>
          </div>
        </div>
      </header>

      <RunningLine />
    </div>
  );
};