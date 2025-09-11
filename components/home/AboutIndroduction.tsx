"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import { BASE_URL } from "@/app/lib/constant";

import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

interface SlideVideo {
    id: number;
    title_kh: string;
    title_en: string;
    link_video: string;
    image: string | null;
}

// Normalize image path
function normalizeImage(p?: string | null) {
    if (!p) return "/placeholder-image.png";
    if (p.startsWith("http")) return p;
    return `${BASE_URL.replace(/\/$/, "")}/${p.replace(/^\/+/, "")}`;
}

export default function SlideVideoHome() {
    const { t } = useTranslation();
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const [showVideo, setShowVideo] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["slides-video"],
        queryFn: async () => {
            const res = await post({ endpoint: "/slides-video/list", data: {} });
            return res.data as SlideVideo[];
        },
        staleTime: 60_000,
    });

    const slides = Array.isArray(data) ? data : [];

    const openModal = (link: string) => {
        try {
            const url = new URL(link);
            const id = url.searchParams.get("v") || link.split("youtu.be/")[1];
            setVideoId(id ?? link);
        } catch {
            setVideoId(link);
        }
        setFadeOut(false);
        setShowVideo(true);
    };

    const closeModal = () => setFadeOut(true);

    useEffect(() => {
        if (fadeOut) {
            const timeout = setTimeout(() => {
                setShowVideo(false);
                setFadeOut(false);
                setVideoId(null);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [fadeOut]);

    if (isLoading)
        return <div className="w-full h-[400px] bg-gray-200 animate-pulse" />;
    if (isError)
        return (
            <div className="w-full h-[400px] flex items-center justify-center text-red-600">
                Failed to load slides.
            </div>
        );
    if (!slides.length)
        return (
            <div className="w-full h-[400px] flex items-center justify-center">
                No slides found.
            </div>
        );

    return (
        <>
            <div className="section-padding">
                <div className="container">
                    <div className="row">
                        {/* Swiper */}
                        <div className="col-lg-6 relative h-[400px]">
                            <button
                                ref={prevRef}
                                className="btn_slide_home absolute left-4 top-1/2 z-20 transform -translate-y-1/2"
                            >
                                <GrFormPrevious size={30} />
                            </button>
                            <button
                                ref={nextRef}
                                className="btn_slide_home absolute right-4 top-1/2 z-20 transform -translate-y-1/2"
                            >
                                <MdNavigateNext size={30} />
                            </button>

                            <Swiper
                                modules={[Navigation, Autoplay]}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                onBeforeInit={(swiper) => {
                                    // ✅ Ensure navigation refs are set before init
                                    if (typeof swiper.params.navigation !== "boolean") {
                                        swiper.params.navigation = {
                                            ...(swiper.params.navigation || {}),
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        };
                                    }
                                }}
                                speed={1000}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                loop={true}
                                className="h-full"
                            >
                                {slides.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <div
                                            onClick={() => openModal(slide.link_video)}
                                            role="button"
                                            tabIndex={0}
                                            className="relative w-full h-[400px] cursor-pointer"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ")
                                                    openModal(slide.link_video);
                                            }}
                                        >
                                            <Image
                                                src={normalizeImage(slide.image)}
                                                alt={slide.title_en}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                            <div
                                                className="absolute top-1/2 left-1/2 text-red-600 opacity-80"
                                                style={{
                                                    transform: "translate(-50%, -50%)",
                                                    fontSize: "4rem",
                                                    pointerEvents: "none",
                                                }}
                                            >
                                                <i className="fab fa-youtube"></i>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Right content */}
                        <div className="col-lg-6 khmer-text">
                            <h6 className="text-primary text-uppercase mb-2 mt-3">
                                {t("homePage.about")}
                            </h6>

                            <p>{t("homePage.desc1")}</p>
                            <p>{t("homePage.desc2")}</p>

                            {/* Course list */}
                            <div className="row g-2 mb-4 pb-2">
                                <div className="col-sm-6">
                                    <i className="fa fa-check text-primary me-2" />{" "}
                                    {t("homePage.computer")}
                                </div>
                                <div className="col-sm-6">
                                    <i className="fa fa-check text-primary me-2" />{" "}
                                    {t("homePage.english")}
                                </div>
                                <div className="col-sm-6">
                                    <i className="fa fa-check text-primary me-2" />{" "}
                                    {t("homePage.chines")}
                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <a className="btn btn-primary py-3 px-5" href="/about">
                                        {t("homePage.moreInfo")}
                                    </a>
                                </div>
                                <div className="col-sm-6">
                                    <a
                                        className="d-inline-flex align-items-center btn btn-outline-primary border-2 p-2"
                                        href="tel:+0123456789"
                                    >
                                        <span className="flex-shrink-0 btn-square bg-primary">
                                            <i className="fa fa-phone-alt text-white" />
                                        </span>
                                        <span className="px-3">+855 86 33 50 50</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {showVideo && videoId && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ${fadeOut
                        ? "opacity-0 transition-opacity duration-300"
                        : "opacity-100 transition-opacity duration-300"
                        }`}
                    onClick={closeModal}
                >
                    <div
                        className="relative w-[90%] h-[60%] md:w-[800px] md:h-[450px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-white text-3xl font-bold z-10"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title="YouTube video"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
