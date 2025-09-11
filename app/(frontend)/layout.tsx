"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import "../locales/i18n";
import i18n from "../locales/i18n";

export default function SubPageLayout({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") || "en";
        i18n.changeLanguage(savedLang); // ✅ safely update after hydration
    }, []);

    return (
        <QueryClientProvider client={client}>
            <Breadcrumb />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
