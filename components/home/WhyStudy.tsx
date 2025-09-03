"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import { useTranslation } from "react-i18next";

type WhyStudyItem = {
    id: number;
    title_kh: string;
    title_en: string;
    description_kh: string;
    description_en: string;
};

export default function WhyStudy() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || "en";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["why-study"],
        queryFn: async () => {
            const res = await post({
                endpoint: "/whystudy/list",
                data: {},
            });
            return res.data as WhyStudyItem[];
        },
        staleTime: 60_000,
    });

    if (isLoading) return <div className="text-center py-5">Loading...</div>;
    if (isError) return <div className="text-center text-red-500 py-5">Error loading data</div>;

    return (
        <div>
            <div className="container pt-5 pb-5">
                <div className="mb-0 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="bg-primary text-center p-5">
                        <h2 className="mb-4 contact-title">
                            <span className="khmer-text">{t("homePage.whyStudy")}</span>{" "}
                            SITS
                        </h2>
                        <div className="khmer-text contact-title text-[18px]">
                            {t("homePage.learnFeatures")}
                        </div>

                        <div className="row mt-5">
                            {data?.map((item) => (
                                <div key={item.id} className="col-md-6 mb-2">
                                    <div className="khmer-text bg_why_study p-4 text-center">
                                        <h3>
                                            {currentLang === "kh" ? item.title_kh : item.title_en}
                                        </h3>
                                        <div>
                                            {currentLang === "kh"
                                                ? item.description_kh
                                                : item.description_en}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
