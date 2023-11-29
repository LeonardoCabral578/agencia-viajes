import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis reservas - ViajePlus",
  description: "Mis reservas - ViajePlus",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
