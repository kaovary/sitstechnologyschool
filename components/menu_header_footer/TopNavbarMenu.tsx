"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import SwitchLanguage from "../SwitchLanguage";
import i18n from "@/app/locales/i18n";

export default function TopNavbarMenu() {
    //translate
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    console.log("i18n initialized?", i18n.isInitialized);
    //translate

    return (
        <div className="bg_header_top text-light py-2">
            <div className="container">
                <div className="row gx-0 align-items-center">
                    {/* Left side: phone, email, language */}
                    <div className="col-lg-7 d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center gap-1">
                            <span className="fa fa-phone-alt" />
                            <span>{t("phone")}: +855 86 33 50 50</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <i className="fa fa-envelope" />
                            <span>{t("email")}: rousmab9999@gmail.com</span>
                        </div>
                        <SwitchLanguage />
                    </div>

                    {/* Right side: menu links */}
                    <div className="col-lg-5 text-lg-end d-flex justify-content-lg-end gap-3 mt-2 mt-lg-0">
                        <Link href="/faq" className="text-white hover:underline">
                            {t("faq")}
                        </Link>
                        <Link href="/privacy-policy" className="text-white hover:underline">
                            {t("privacyPolicy")}
                        </Link>
                        <Link href="/term-condition" className="text-white hover:underline">
                            {t("terms")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
