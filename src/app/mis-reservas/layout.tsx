import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservas - ViajePlus",
  description: "Reservas - ViajePlus",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
