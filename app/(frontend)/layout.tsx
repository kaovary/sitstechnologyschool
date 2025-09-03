"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";
import "../locales/i18n";

export default function SubPageLayout({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={client}>
            <Breadcrumb />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
