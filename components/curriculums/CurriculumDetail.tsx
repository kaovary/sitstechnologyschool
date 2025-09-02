"use client";

import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

type CurriculumItem = {
    id: number;
    title_en?: string | null;
    title_kh?: string | null;
    description_en?: string | null;
    description_kh?: string | null;
    image?: string | null;
    image_gallerys?: string | null; // stored as JSON string
};

export default function CurriculumDetailClient() {
    const { id } = useParams<{ id: string }>();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [navigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setNavigationReady(true), 100);
        return () => clearTimeout(t);
    }, []);

    // ✅ Fetch main curriculum
    const { data, isLoading, isError } = useQuery<CurriculumItem>({
        queryKey: ["curriculum-item", id],
        queryFn: async () => {
            const res = await post({ endpoint: "/curriculum-items/detail", data: { id } });
            return res.data;
        },
        enabled: !!id,
    });

    // ✅ Fetch related curriculums
    const { data: related = [] } = useQuery<CurriculumItem[]>({
        queryKey: ["curriculum-item", "related", id],
        queryFn: async () => {
            const res = await post({ endpoint: "/curriculum-items/related", data: { id } });
            return res.data || [];
        },
        enabled: !!id,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p className="text-red-600">Error loading curriculum item.</p>;

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const normalizeImage = (p?: string | null) =>
        !p ? null : p.startsWith("http") ? p : `${baseUrl}/${p.replace(/^\/+/, "")}`;

    const mainImage = normalizeImage(data.image);
    const gallery = data.image_gallerys ? JSON.parse(data.image_gallerys) : [];
    const galleryImages = Array.isArray(gallery)
        ? gallery.map((g: string) => normalizeImage(g)!).filter(Boolean)
        : [];

    const sliderImages = mainImage ? [mainImage, ...galleryImages] : galleryImages;

    return (
        <div className="section-padding">
            <div className="container">
                <div className="row">
                    {/* Main content */}
                    <div className="col-md-9">
                        <h1 className="text-3xl font-bold mb-6">
                            {data.title_en || data.title_kh}
                        </h1>

                        {/* Swiper Main */}
                        {sliderImages.length > 0 && (
                            <div className="relative h-[450px] w-full rounded-lg overflow-hidden">
                                <button
                                    ref={prevRef}
                                    className="absolute btn_slide_home left-4 top-1/2 z-20 transform -translate-y-1/2"
                                    aria-label="Previous slide"
                                    type="button"
                                >
                                    <GrFormPrevious size={30} />
                                </button>
                                <button
                                    ref={nextRef}
                                    className="absolute btn_slide_home right-4 top-1/2 z-20 transform -translate-y-1/2"
                                    aria-label="Next slide"
                                    type="button"
                                >
                                    <MdNavigateNext size={30} />
                                </button>

                                {navigationReady && (
                                    <Swiper
                                        modules={[Navigation, Thumbs, Autoplay]}
                                        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        loop={sliderImages.length > 1}
                                        className="h-full rounded-lg"
                                    >
                                        {sliderImages.map((src, index) => (
                                            <SwiperSlide key={index}>
                                                <Image
                                                    src={src}
                                                    alt={`Slide ${index + 1}`}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-full object-cover rounded-lg"
                                                    style={{ maxHeight: "450px" }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </div>
                        )}

                        {/* Thumbnails */}
                        {sliderImages.length > 1 && (
                            <Swiper
                                modules={[Thumbs]}
                                slidesPerView={4}
                                spaceBetween={10}
                                watchSlidesProgress
                                slideToClickedSlide
                                className="mt-4"
                                onSwiper={(swiper) => {
                                    if (!thumbsSwiper) setThumbsSwiper(swiper);
                                }}
                            >
                                {sliderImages.map((src, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className={`cursor-pointer rounded-md overflow-hidden ${activeIndex === index ? "ring-2 ring-blue-500" : ""
                                            }`}
                                    >
                                        <Image
                                            src={src}
                                            width={100}
                                            height={100}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="object-cover w-full h-20"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        <div className="mt-6">
                            <p>{data.description_en || data.description_kh}</p>
                        </div>
                    </div>

                    {/* Sidebar - Related Curriculums */}
                    <div className="col-md-3">
                        <h2 className="mb-4">Related</h2>
                        {related.length === 0 && <p>No related curriculums found.</p>}

                        {related.map((item) => {
                            const img = normalizeImage(item.image) || "/assets/img/placeholder.png";
                            const t = item.title_en || item.title_kh || "Untitled";
                            return (
                                <div key={item.id} className="d-flex mb-3">
                                    <Image
                                        src={img}
                                        width={100}
                                        height={80}
                                        alt={t}
                                        className="rounded-lg object-cover"
                                    />
                                    <Link href={`/curriculum-items/${item.id}`} className="ms-3">
                                        <h5 className="text-sm font-medium">{t}</h5>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
