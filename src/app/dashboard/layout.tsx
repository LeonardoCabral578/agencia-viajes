"use client";
import { useAppSelector } from "@/redux/hooks";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.userReducer);
  const router = useRouter();

  useEffect(() => {
    if (user.userSelected.rolesUsuarios.tipo_rol !== "Administrador") {
      router.push("/ingreso");
    }
  }, []);

  return <>{children}</>;
}
