import { ContactModalTrigger } from "../ContactModal";

const discounts = [
  {
    id: 1,
    amount: 10,
    text: 'Постоянным клиентам',
  },
  {
    id: 2,
    amount: 10,
    text: 'Ветеранам СВО',
  },
  {
    id: 3,
    amount: 15,
    text: 'При втором заказе через сайт в течение месяца',
  }
];

type DiscountItemProps = {
  amount: number;
  text: string;
};

const DiscountItem = ({ amount, text }: DiscountItemProps) => {
  return (
    <li className="flex-1 min-w-0">
      <article className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-100 h-full">
              <span className="flex-shrink-0 text-3xl font-bold text-blue-600">
                {amount}%
              </span>
        <p className="text-lg text-gray-700 pt-1">
          {text}
        </p>
      </article>
    </li>
  )
}

export const Discounts = () => {
  return (
    <section
      className="py-16 px-4 bg-white"
      aria-labelledby="discounts-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="discounts-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Наши скидки
        </h2>

        <ul className="flex flex-col gap-6 mb-10 lg:flex-row lg:justify-between">
          {discounts.map(discount =>
            <DiscountItem key={discount.id} amount={discount.amount} text={discount.text} />
          )}
        </ul>

        <div className="flex w-full justify-center">
          <ContactModalTrigger />
        </div>
      </div>
    </section>
  );
};
