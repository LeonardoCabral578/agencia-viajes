import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingreso - ViajePlus",
  description: "Ingres a tu cuenta de ViajePlus",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
