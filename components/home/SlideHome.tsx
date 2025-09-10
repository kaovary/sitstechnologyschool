"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import { BASE_URL } from "@/app/lib/constant";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface Slide {
    id: number;
    title: string;
    image: string | null;
    description?: string;
}

function normalizeImage(p?: string | null) {
    if (!p) return "/placeholder-image.png";
    if (p.startsWith("http")) return p;
    return `${BASE_URL.replace(/\/$/, "")}/${p.replace(/^\/+/, "")}`;
}

export default function SlideHome() {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["slides-home"],
        queryFn: async () => {
            const res = await post({ endpoint: "/home/slides-home/list", data: {} });
            return res.data as Slide[];
        },
        staleTime: 60_000,
    });

    const slides: Slide[] = Array.isArray(data) ? data : [];

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    if (isLoading)
        return <div className="w-full h-[500px] bg-gray-200 animate-pulse" />;
    if (isError)
        return (
            <div className="w-full h-[500px] flex items-center justify-center text-red-600">
                Failed to load slides.
            </div>
        );
    if (!slides.length)
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                No slides found.
            </div>
        );

    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            {/* Navigation buttons */}
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

            {/* Swiper */}
            <Swiper
                modules={[Navigation, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1000}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onSwiper={setSwiperInstance}
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-[500px] cursor-pointer">
                            <Image
                                src={normalizeImage(slide.image)}
                                alt={slide.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                            {/* {slide.description && (
                                <div className="absolute bottom-10 left-10 bg-black bg-opacity-50 text-white p-4 rounded-lg max-w-lg">
                                    <h3 className="text-xl font-bold">{slide.title}</h3>
                                    <p className="text-sm">{slide.description}</p>
                                </div>
                            )} */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
