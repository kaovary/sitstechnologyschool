'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { post } from "@/app/lib/api";
import { useTranslation } from "react-i18next";

type FAQItem = {
    id: number;
    title_kh: string;
    title_en: string;
    description_kh: string;
    description_en: string;
};

export default function FAQCom() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language; // "en" or "kh"
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Fetch FAQs
    const { data, isLoading, error } = useQuery({
        queryKey: ["faqs"],
        queryFn: async () => {
            const res = await post({
                endpoint: "/admin/faq/list",
                data: { search: "" }, // optional search
            });
            return res?.data || {};
        },
    });

    // Extract actual FAQ array safely
    const faqs: FAQItem[] = Array.isArray(data?.data) ? data.data : [];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (isLoading) return <p>Loading FAQs...</p>;
    if (error) return <p className="text-red-500">Failed to load FAQs</p>;
    if (faqs.length === 0) return <p>No FAQs found</p>;

    return (
        <div className="container max-w-3xl mx-auto px-4 py-10 khmer-text">
            <div className="banner_title text-2xl font-bold mb-6">
                {t("faq")}
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    const title = lang === "en" ? faq.title_en : faq.title_kh;
                    const description = lang === "en" ? faq.description_en : faq.description_kh;

                    return (
                        <div
                            key={faq.id}
                            className="border border-gray-300 rounded-xl bg-white shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full px-5 py-4 text-left text-lg text-gray-800"
                            >
                                <span>{title}</span>
                                <span className="text-2xl font-bold text-gray-500">
                                    {isOpen ? "-" : "+"}
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-5 pb-4 text-gray-600"
                                    >
                                        <p>{description}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
