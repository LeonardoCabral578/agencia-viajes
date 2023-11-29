"use client";
import viaje from "@/assets/img/viaje.jpg";
import { Hero } from "@/components/Components/Hero/Hero";

export default function Home() {
  return (
    <div className="page home relative">
      <Hero
        img={viaje}
        title="ViajePlus"
        sub_title="Alcanza el lugar que quieras con un click"
      />
      <div className="container mx-auto"></div>
    </div>
  );
}
