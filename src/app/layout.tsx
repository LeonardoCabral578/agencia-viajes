// "use client";
import Navbar from "@/components/Layout/Navbar/Navbar";
import "@/styles/main.sass";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import educar from "@/assets/img/educar.jpg";
import { Providers } from "@/redux/providers";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Layout/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inicio | EDUCAR",
  description: "Página principal de EDUCAR",
};

export const API_URL = process.env.API_URL_SERVER;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar
            links={[
              { label: "Inicio", href: "/" },
              { label: "Noticias", href: "/noticias" },
              { label: "Empleo", href: "/empleo" },
              { label: "Galeria", href: "/galeria" },
              { label: "Inscripcion", href: "/inscripcion" },
            ]}
            logo={educar}
            dropdown={{
              label: "Más",
              items: [
                { label: "Quienes somos", href: "/quienes_somos" },
                { label: "Niveles Educativos", href: "/niveles_educativos" },
                {
                  label: "Bienestar Estudiantil",
                  href: "/bienestar_estudiantil",
                },
              ],
            }}
          />
          <ToastContainer />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
