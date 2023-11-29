import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse - ViajePlus",
  description: "Registrate en nuestro portal de ViajePlus",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
