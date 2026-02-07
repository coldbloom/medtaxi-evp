export const RunningLine = () => {
  return (
    <div className="marquee-bar overflow-hidden bg-blue-600 py-2 text-white" aria-hidden>
      <div className="marquee-track">
        <span className="whitespace-nowrap px-8 text-sm font-medium md:text-base">
          Есть предложение дешевле?&nbsp;&nbsp;&nbsp;Позвоните.&nbsp;&nbsp;&nbsp;Скорректируем нашу цену и добавим уверенности!
        </span>
        <span className="whitespace-nowrap px-8 text-sm font-medium md:text-base">
          Есть предложение дешевле? Позвоните. Скорректируем нашу цену и добавим уверенности.
        </span>
      </div>
    </div>
  );
};