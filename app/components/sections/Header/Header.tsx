import Image from "next/image";
import { RunningLine } from "@/app/components/sections/Header/RunningLine";

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
              <div>
                <h1 className="text-lg font-bold text-blue-600">
                  Медтакси Евпатория
                </h1>
                {/*<p className="text-sm text-gray-600 mt-1">*/}
                {/*  Перевозка лежачих больных и инвалидов*/}
                {/*</p>*/}
              </div>
            </div>
            <a
              href="tel:+79789380221"
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-lg"
              aria-label="Позвонить по телефону +79789380221"
            >
              +7 (978) 938-02-21
            </a>
          </div>
        </div>
      </header>

      <RunningLine />
    </div>
  );
};