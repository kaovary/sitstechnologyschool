"use client";

import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function CurriculumDetailClient() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["curriculum-item", id],
        queryFn: () =>
            post({ endpoint: "/curriculum-items/detail", data: { id } }),
    });

    const item = data?.data;
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !item) return <div>Failed to load curriculum item.</div>;

    const galleryImages = item.image_gallerys ? JSON.parse(item.image_gallerys) : [];

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
        <div className="section-padding">
            <div className="container">
                <h1 className="mb-4">{item.title_en || item.title_kh}</h1>

                <Swiper
                    modules={[Thumbs, Navigation]}
                    thumbs={{ swiper: thumbsSwiper }}
                    navigation
                    spaceBetween={10}
                    slidesPerView={1}
                >
                    <SwiperSlide key={item.id}>
                        <Image
                            src={item.image ? `${baseUrl}/${item.image}` : "/assets/img/placeholder.png"}
                            alt={item.title_en || item.title_kh}
                            width={600}
                            height={400}
                            className="object-cover w-full rounded-lg"
                        />
                    </SwiperSlide>

                    {galleryImages.map((img: string, index: number) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={`${baseUrl}/${img}`}
                                alt={`Gallery ${index + 1}`}
                                width={600}
                                height={400}
                                className="object-cover w-full rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnails */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={4}
                    spaceBetween={10}
                    watchSlidesProgress
                    className="mt-4"
                >
                    {[item.image, ...galleryImages].map((img: string, index: number) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={`${baseUrl}/${img}`}
                                alt={`Thumbnail ${index + 1}`}
                                width={100}
                                height={80}
                                className="object-cover w-full rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="mt-4">
                    <h2>Description</h2>
                    <p>{item.description_en || item.description_kh}</p>
                </div>
            </div>
        </div>
    );
}
