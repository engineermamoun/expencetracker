"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppContext";
import Login from "./components/Login";
import { useLocale } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const globalState = useAppContext();
  const locale = useLocale();

  useEffect(() => {
    if (globalState?.auth?.token) {
      router.push(`/${locale}/home`);
    }
  }, [globalState?.auth?.token, locale, router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {" "}
      <Login />
    </div>
  );
}
