"use client";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxStoreProvider from "./StoreProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />

        <div id="portal"></div>

        <ReduxStoreProvider>{children}</ReduxStoreProvider>
      </body>
    </html>
  );
}
