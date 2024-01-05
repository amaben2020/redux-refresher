"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function ReduxStoreProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <Provider store={store}>{children}</Provider>;
}
