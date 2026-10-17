type RouteChipProps = {
  destination: string;
  origin?: string;
  region?: string;
};

/** Server-rendered route card shared by the intercity directions. */
export function RouteChip({ destination, origin = "Донецк", region = "ДНР" }: RouteChipProps) {
  return (
    <div
      className="grid min-h-24 min-w-0 grid-cols-[minmax(0,.85fr)_auto_minmax(0,1.15fr)] items-center gap-2 rounded-2xl border border-white/15 px-4 py-3"
      aria-label={`Маршрут: ${origin} ${region} → ${destination}`}
    >
      <div className="min-w-0">
        <p className="text-[11px] text-[#a9c1b7]">Отправление</p>
        <p className="mt-1 text-base font-black leading-snug text-white">
          {origin} <span className="text-xs font-normal text-[#a9c1b7]">{region}</span>
        </p>
      </div>
      <span aria-hidden="true" className="text-xl text-[#f3b941]">→</span>
      <div className="min-w-0 text-right">
        <p className="text-[11px] text-[#a9c1b7]">Назначение</p>
        <p className="mt-1 text-base font-black leading-snug break-words text-white">{destination}</p>
      </div>
    </div>
  );
}

const destinations = ["Москва", "Санкт-Петербург", "Ростов-на-Дону", "Краснодар"];

export function DonetskRouteChips({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ul
        className="grid grid-cols-1 gap-3 min-[600px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
        aria-label="Направления поездок из Донецка и ДНР"
      >
        {destinations.map((destination) => (
          <li key={destination} className="min-w-0"><RouteChip destination={destination} /></li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-[#a9c1b7]">
        Также возможны поездки из Донецка и ДНР в другие города России. Маршрут и остановки согласуем заранее.
      </p>
    </div>
  );
}
