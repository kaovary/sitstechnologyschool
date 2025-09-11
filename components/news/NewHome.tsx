"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";

type NewsItem = {
    id: number;
    title_en?: string;
    title_kh?: string;
    short_description_en?: string;
    short_description_kh?: string;
    image?: string | null;
};

const normalizeImage = (img?: string | null) =>
    !img
        ? null
        : img.startsWith("http")
            ? img
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img.replace(/^\/+/, "")}`;

export default function NewHome() {
    const { t, i18n } = useTranslation();
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    // ✅ Fetch all news
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news-home"],
        queryFn: () => post({ endpoint: "/news/listall", data: {} }),
    });

    const items: NewsItem[] = Array.isArray(data?.data) ? data.data : [];
    const itemsToShow = items.slice(0, 5); // show first 5

    if (isLoading) return <div>Loading...</div>;
    if (isError || !itemsToShow.length) return <div>No news found.</div>;

    const lang = i18n.language;

    return (
        <div className="container-xxl my-3 section-padding">
            <div className="container wow fadeInUp" data-wow-delay="0.1s">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
                    <h2 className="text-primary mb-2 khmer-text">{t("homePage.news")}</h2>
                </div>

                <div className="row g-4 justify-content-center">
                    <div className="relative px-5">
                        <div className="relative">
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                loop={itemsToShow.length > 1}
                                autoplay={{ delay: 5000 }}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                onBeforeInit={(swiper) => {
                                    if (typeof swiper.params.navigation !== "boolean") {
                                        swiper.params.navigation = {
                                            ...(swiper.params.navigation || {}),
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        };
                                    }
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 1.2 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1280: { slidesPerView: 4 },
                                }}
                            >
                                {itemsToShow.map((item) => {
                                    const img = normalizeImage(item.image);
                                    const title = lang === "kh" ? item.title_kh : item.title_en;
                                    const description =
                                        lang === "kh"
                                            ? item.short_description_kh
                                            : item.short_description_en;

                                    return (
                                        <SwiperSlide key={item.id}>
                                            <div className="courses-item d-flex flex-column bg-white overflow-hidden h-full rounded shadow-sm">
                                                <div className="relative w-full h-[200px] img-course">
                                                    {img ? (
                                                        <Image
                                                            src={img}
                                                            alt={title || "News"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-gray-500">No Image</span>
                                                        </div>
                                                    )}
                                                    <div className="courses-overlay absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                        <Link
                                                            className="btn btn-outline-primary border-2"
                                                            href={`/news/${item.id}`}
                                                        >
                                                            {t("viewDetail")}
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="p-4 pt-2 dec-item-course relative">
                                                    <Link
                                                        href={`/news/${item.id}`}
                                                        className="mb-3 des-title block text-lg font-semibold"
                                                    >
                                                        {title}
                                                    </Link>
                                                    <p className="des mt-2 text-sm text-gray-600">
                                                        {description}
                                                    </p>
                                                    <div className="absolute bottom-[16px] right-[17px] w-[88%]">
                                                        <div className="border-line"></div>
                                                        <Link
                                                            className="detail_item text-primary"
                                                            href={`/news/${item.id}`}
                                                        >
                                                            {t("homePage.viewDetail")}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>

                            {/* Custom Navigation Buttons */}
                            <div className="btn_slide_item">
                                <button
                                    ref={prevRef}
                                    className="custom-nav-btn-prev custom-nav-btn"
                                >
                                    <GrFormPrevious size={24} />
                                </button>
                                <button
                                    ref={nextRef}
                                    className="custom-nav-btn-next custom-nav-btn"
                                >
                                    <MdNavigateNext size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
