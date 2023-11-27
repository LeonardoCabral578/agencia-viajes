import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse - EDUCAR PARA TRANSFORMAR",
  description: "Registrate en nuestro portal de EDUCAR PARA TRANSFORMAR",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
