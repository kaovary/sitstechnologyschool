// /app/SwitchLanguage.tsx
"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function SwitchLanguage() {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Initialize language from localStorage
    const [lang, setLang] = useState<"en" | "kh">(
        typeof window !== "undefined" && localStorage.getItem("lang") === "kh" ? "kh" : "en"
    );

    useEffect(() => {
        setMounted(true);

        // Change i18n language
        if (i18n && typeof i18n.changeLanguage === "function") {
            i18n.changeLanguage(lang);
        }

        // Set html lang attribute
        document.documentElement.lang = lang;

        // Save selected language
        localStorage.setItem("lang", lang);

        // Optional: dynamically change font
        document.body.style.fontFamily =
            lang === "en" ? "'Kantumruy Pro', sans-serif" : "'Siemreap', sans-serif";
    }, [lang, i18n]);

    if (!mounted) return null; // Avoid hydration error

    return (
        <button
            onClick={() => setLang(lang === "en" ? "kh" : "en")}
            className="inline-flex items-center"
        >
            <Image
                src={lang === "en" ? "/assets/img/en.png" : "/assets/img/kh.png"}
                width={20}
                height={12}
                alt={lang === "en" ? "Khmer" : "English"}
            />
            <span className="ms-1">{lang === "en" ? "English" : "ភាសាខ្មែរ"}</span>
        </button>
    );
}
