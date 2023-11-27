import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingreso - EDUCAR PARA TRANSFORMAR",
  description: "Ingres a tu cuenta de EDUCAR PARA TRANSFORMAR",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
