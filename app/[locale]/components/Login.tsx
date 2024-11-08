"use client";

import React from "react";

import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./login.module.css";
import { useTranslations, useLocale } from "next-intl";
import { useAppContext } from "../AppContext";
import { login } from "../libs/requests";
import cashImages from "@/app/[locale]/assets/cash.png";
import hsoubLogo from "@/app/[locale]/assets/hsoub.png";

const Login = () => {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const globalState = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await login(email, password);
    if (response?.message) {
      setLoading(false);
      alert(response.message);
    } else {
      globalState?.authenticate({
        user: response.user,
        token: response.token,
      });
      setLoading(false);
      router.push(`/${locale}/home`);
    }
  };
  return (
    <div className={classes["login-container"]}>
      <div className={classes["image-login"]}>
        <Image alt="Login Image" src={cashImages} priority />
      </div>
      <div className={classes["form-container"]}>
        <div className={classes["image-container"]}>
          <Image
            width={200}
            height={62}
            alt="Login Image"
            src={hsoubLogo}
            priority
          />
        </div>
        <h1 className={classes["form-title"]}>{t("title")}</h1>
        <p className={classes["form-subtitle"]}>{t("description")} </p>
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              {t("dontHaveAccount")}
              <Link
                href={`/${locale}/register`}
                className={classes["form-link"]}
              >
                {t("register")}
              </Link>
            </p>
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <button type="submit" className={classes["form-button"]} disabled={loading}>
             {loading ? "Loading..": t("login")} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
