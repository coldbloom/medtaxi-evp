import React from "react";
import { EquipmentSlider } from "./EquipmentSlider";
import {HeadingSection} from "@/app/components/sections/HeadingSection";

export type EquipmentItem = {
  title: string;
  description: string;
  image: string;
};

const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    title: "Кресельные носилки",
    description:
      "Для компактной транспортировки лежачих больных в узких помещениях, если пациент может находиться в положении сидя.",
    image: "/1.png",
  },
  {
    title: "Регулируемая каталка",
    description:
      "Для лежачих больных, если позволяет ширина проёма лестницы или есть грузовой лифт. На ней можно закрепить стойки для капельницы, дыхательной или реанимационной аппаратуры.",
    image: "/2.png",
  },
  {
    title: "Мягкие носилки",
    description:
      "Используют при аварийных ситуациях и тогда, когда обычными носилками невозможно воспользоваться: при транспортировании людей по узким лестницам и извилистым проходам.",
    image: "/3.png",
  },
];

export function Equipment() {
  return (
    <section
      className="pb-16 px-4 bg-white"
      aria-labelledby="equipment-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <HeadingSection tag="h2" id="equipment-heading">Оборудование для перевозки</HeadingSection>
        <EquipmentSlider items={EQUIPMENT_ITEMS} />
      </div>
    </section>
  );
}
