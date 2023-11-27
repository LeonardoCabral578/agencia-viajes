"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

interface IProvider {
  children: React.ReactNode;
}

export function Providers({ children }: IProvider) {
  return <Provider store={store}>{children}</Provider>;
}
