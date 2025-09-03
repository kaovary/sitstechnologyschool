"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api"; // your helper for POST requests

import "swiper/css";
import { useTranslation } from "react-i18next";

type PartnerItem = {
    id: number;
    title_kh: string;
    title_en: string;
    link_url?: string;
    image?: string;
};

export default function PartnerComponent() {
    const { t, i18n } = useTranslation();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["partners"],
        queryFn: async () => {
            const res = await post({ endpoint: "/partners/list", data: {} });
            return res.data as PartnerItem[];
        },
        staleTime: 60_000,
    });

    if (isLoading) return <div className="text-center py-5">Loading...</div>;
    if (isError) return <div className="text-center text-red-500 py-5">Error loading data</div>;

    return (
        <div className="section-padding">
            <div className="container wow fadeInUp" data-wow-delay="0.1s">
                <h2 className="mb-10 text-center">{t("homePage.partner")}</h2>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    loop
                    modules={[Autoplay]}
                >
                    {data?.map((partner) => (
                        <SwiperSlide key={partner.id}>
                            <div className="d-flex justify-content-center py-2">
                                <a href={partner.link_url || "#"} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={partner.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${partner.image}` : "/assets/img/placeholder.png"}
                                        alt={partner.title_kh || partner.title_en}
                                        width={200}
                                        height={120}
                                        className="object-contain"
                                    />
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
