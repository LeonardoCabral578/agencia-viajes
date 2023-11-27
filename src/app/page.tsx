"use client";
import Image from "next/image";
import Link from "next/link";
import infantes from "@/assets/img/jardin.jpg";
import { Hero } from "@/components/Components/Hero/Hero";
import { generateRandomKey, shortenText } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useGetNoticiasQuery } from "@/redux/services/noticiaApi";
import Card from "@/components/Components/Card/Card";

const photosRed = [
  "https://i.imgur.com/tMCRImP.png",
  "https://i.imgur.com/13N3Vwu.jpg",
  "https://i.imgur.com/676lTfb.jpg",
  "https://i.imgur.com/ayR8NcV.jpg",
  "https://i.imgur.com/6bVND2O.jpg",
];

export default function Home() {
  return (
    <div className="page home relative">
      <Hero
        img={infantes}
        title="Educar Para Transformar"
        sub_title="Página dedicada al desarrollo de enseñanzas"
      />
      <div className="container mx-auto"></div>
    </div>
  );
}
