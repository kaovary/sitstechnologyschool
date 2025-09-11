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

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

type NewsItem = {
    id: number;
    title?: string | null;
    title_en?: string | null;
    title_kh?: string | null;
    description_en?: string | null;
    description_kh?: string | null;
    short_description_en?: string | null;
    short_description_kh?: string | null;
    image?: string | null;
    image_gallerys?: string[] | null;
};

type NewsDetailClientProps = {
    id: number;
};

export default function NewsDetailClient({ id }: NewsDetailClientProps) {
    const params = useParams<{ id: string }>();

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [navigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setNavigationReady(true), 100);
        return () => clearTimeout(t);
    }, []);

    const { data: news, isLoading, isError } = useQuery<NewsItem>({
        queryKey: ["news", "detail", id],
        queryFn: async () => {
            const res = await post({ endpoint: "/news/detail", data: { id } });
            return res.data; // ✅ return the actual news object
        },
        enabled: Number.isFinite(id),
    });


    const { data: related = [] } = useQuery<NewsItem[]>({
        queryKey: ["news", "related", id],
        queryFn: async () => {
            const res = await post({ endpoint: "/news/related", data: { id } });
            return Array.isArray(res) ? res : res?.data || [];
        },
        enabled: Number.isFinite(id),
    });


    if (isLoading) return <p>Loading...</p>;
    if (isError || !news) return <p className="text-red-600">Error loading news.</p>;

    const normalizeImage = (p?: string | null) =>
        !p ? null : p.startsWith("http") ? p : `/${p.replace(/^\/+/, "")}`;

    const mainImageUrl = normalizeImage(news.image);
    const gallery = (news.image_gallerys || []).map((g) => normalizeImage(g)!).filter(Boolean);
    const sliderImages = mainImageUrl ? [mainImageUrl, ...gallery] : gallery;

    return (
        <div className="section-padding">
            <div className="container">
                <div className="row">
                    {/* Main content */}
                    <div className="col-md-9">
                        <h1 className="text-3xl font-bold mb-6">
                            {news.title_en || news.title_kh}
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
                            <p>{news.description_en || news.description_kh}</p>
                        </div>
                    </div>

                    {/* Related News Sidebar */}
                    <div className="col-md-3">
                        <h2 className="mb-4">Related News</h2>
                        {(!related || related.length === 0) && <p>No related news found.</p>}

                        {related.map(({ id: rid, title, title_en, title_kh, image }) => {
                            const img = normalizeImage(image) || "/placeholder-image.png";
                            const t = title || title_en || title_kh || "Untitled";
                            return (
                                <div key={rid} className="d-flex mb-3">
                                    <Image src={img} width={100} height={80} alt={t} className="rounded-lg" />
                                    <Link href={`/news/${rid}`} className="ms-3">
                                        <h5>{t}</h5>
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
