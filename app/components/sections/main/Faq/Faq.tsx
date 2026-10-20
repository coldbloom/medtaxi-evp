import { FaqAccordion } from "./FaqAccordion";
import { homeFaqItems } from "@/src/features/home/content/faq";
import {HeadingSection} from "@/app/components/sections/HeadingSection";

export const Faq = () => {
  return (
    <section
      className="py-16 px-4 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-3xl">
        <HeadingSection tag="h2" id="faq-heading">Частые вопросы о перевозке лежачих больных</HeadingSection>
        <FaqAccordion items={homeFaqItems} groupName="home-faq" />
      </div>
    </section>
  );
};
