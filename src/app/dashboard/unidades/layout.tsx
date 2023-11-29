import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unidades - ViajePlus",
  description: "Unidades - ViajePlus",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
