import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva - ViajePlus",
  description: "Reserva - ViajePlus",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
