import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
export function ContactCoverage({ serviceArea, workHours }: { serviceArea: readonly string[]; workHours: readonly { day: string; time: string; accent: boolean }[] }) {
  return (
    <section className="py-16 px-4 bg-gray-50" aria-labelledby="area-heading">
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Crimea map */}
          <div>
            <h2 id="area-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Зона обслуживания
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Работаем по всему Крыму и выполняем дальние рейсы в любой регион России.
            </p>

            {/* Yandex Maps */}
            <div className="rounded-2xl overflow-hidden border border-blue-100 shadow-sm mb-6">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=33.3676%2C45.1906&z=9&l=map&pt=33.3676%2C45.1906%2Cpm2rdl~34.1175%2C45.0533%2Cpm2blm~33.5254%2C44.6056%2Cpm2blm~34.1553%2C44.4950%2Cpm2blm"
                width="100%"
                height="320"
                className="block"
                title="Медтакси Евпатория — карта"
                loading="lazy"
                allowFullScreen
              />
              <div className="bg-white px-4 py-2.5 flex items-center gap-2 border-t border-blue-50">
                <span className="text-blue-600 text-base">📍</span>
                <p className="text-xs text-gray-500">Евпатория — точка базирования. Работаем по всему Крыму и России.</p>
              </div>
            </div>

            {/* Service area chips */}
            <div className="flex flex-wrap gap-2">
              {serviceArea.map((area) => (
                <span
                  key={area}
                  className="bg-blue-50 text-blue-700 text-sm px-4 py-1.5 rounded-full border border-blue-200 font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Working hours + info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-blue-600 px-6 py-4">
                <h3 className="text-white font-bold text-xl">Режим работы</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {workHours.map((item) => (
                  <div key={item.day} className="flex justify-between items-center px-6 py-4">
                    <span className="text-gray-600 text-sm">{item.day}</span>
                    <span className={`font-bold text-sm ${item.accent ? "text-blue-600" : "text-gray-900"}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Регион базирования</p>
                  <p className="font-bold text-gray-900 text-lg">Евпатория, Крым</p>
                  <p className="text-sm text-gray-500 mt-1">Выезжаем по всему полуострову и за его пределы</p>
                </div>
              </div>
            </div>

            {/* Quick call CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Нужна перевозка срочно?</h3>
              <p className="text-blue-100 text-sm mb-5">Принимаем звонки круглосуточно — без выходных и праздников.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedPhoneLink
                  phone="+79789380221"
                  trackingId="urgent_phone_main"
                  className="inline-flex items-center justify-center bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm text-center"
                  aria-label="Позвонить +79789380221"
                >
                  +7 (978) 938-02-21
                </TrackedPhoneLink>
                <TrackedPhoneLink
                  phone="+79895052785"
                  trackingId="urgent_phone_secondary"
                  className="inline-flex items-center justify-center bg-blue-500 text-white border border-blue-400 px-6 py-3 rounded-xl font-bold hover:bg-blue-400 transition-colors text-center"
                  aria-label="Позвонить +79895052785"
                >
                  +7 (989) 505-27-85
                </TrackedPhoneLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
