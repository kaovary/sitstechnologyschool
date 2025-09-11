"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import { useTranslation } from "react-i18next";

type SlideVideo = {
    id: number;
    title_en: string;
    link_video: string;
    image: string | null;
};

function normalizeImage(url?: string | null) {
    if (!url) return "/placeholder-image.png";
    const cleaned = url.replace(/^undefined\/?/, "").replace(/^\/+/, "");
    if (process.env.NEXT_PUBLIC_ASSET_URL) {
        return `${process.env.NEXT_PUBLIC_ASSET_URL.replace(/\/$/, "")}/${cleaned}`;
    }
    return `/${cleaned}`;
}

export default function VideoCom() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false); // ✅ Track client mount
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
        setMounted(true); // ✅ Now we only render the grid on client
    }, []);

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

    if (!mounted) return null; // ✅ Skip server render to avoid hydration error

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
        <div className="section-padding">
            <div className="container">
                <div className="banner_title mb-6">{t('video')}</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 px-3 sm:px-4 lg:px-6">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            onClick={() => openModal(slide.link_video)}
                            role="button"
                            tabIndex={0}
                            className="relative h-[200px] cursor-pointer rounded-xl overflow-hidden group shadow-md"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ")
                                    openModal(slide.link_video);
                            }}
                        >
                            <Image
                                src={normalizeImage(slide.image)}
                                alt={slide.title_en}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div
                                className="absolute top-1/2 left-1/2 text-red-600 opacity-80"
                                style={{
                                    transform: "translate(-50%, -50%)",
                                    fontSize: "3rem",
                                    pointerEvents: "none",
                                }}
                            >
                                <i className="fab fa-youtube"></i>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="flex justify-center">
                    <a
                        href="/videos"
                        className="px-6 py-3 mt-4 font-semibold"
                        style={{ backgroundColor: "#2e73ba", color: "#fff" }}
                    >
                        {t("seeMore")}
                    </a>
                </div>

                {showVideo && videoId && (
                    <div
                        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"
                            }`}
                        onClick={closeModal}
                    >
                        <div
                            className="relative w-[90%] max-w-3xl aspect-video bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                className="w-full h-full"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-white text-2xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
