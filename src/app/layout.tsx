// "use client";
import Navbar from "@/components/Layout/Navbar/Navbar";
import "@/styles/main.sass";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import educar from "@/assets/img/educar.jpg";
import { Providers } from "@/redux/providers";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Layout/Footer/Footer";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ResponsiveAppBar from "./Navbar";

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
          <ResponsiveAppBar />
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
