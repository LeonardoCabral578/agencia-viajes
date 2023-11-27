import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería de imágenes - EDUCAR PARA TRANSFORMAR",
  description: "Galería de imágenes de EDUCAR PARA TRANSFORMAR",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}