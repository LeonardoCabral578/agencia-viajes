"use client";
import React from "react";
import Dashboard from "../Dashboard";
import UnidadTable from "./UnidadTable";

export default function Servicios() {
  return (
    <Dashboard activeTab={"Servicios"}>
      <UnidadTable />
    </Dashboard>
  );
}
