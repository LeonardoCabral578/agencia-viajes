import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - ViajePlus",
  description: "Servicios - ViajePlus",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
