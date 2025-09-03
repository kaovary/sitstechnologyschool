'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import useFancybox from '@/store/FancyBoxGallery';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { get, post } from '@/app/lib/api';
import { useTranslation } from 'react-i18next';

type GalleryType = {
    id: number;
    title_en: string;
    title_kh: string;
};

type GalleryItem = {
    id: number;
    title_en: string;
    title_kh: string;
    gallery_type_id: number;
    image_gallerys: string[];
};

export default function GalleryCom() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language; // "en" or "kh"
    const [fancyboxRef] = useFancybox();
    const [activeType, setActiveType] = useState<number | 'all'>('all');

    // Fetch gallery types
    const { data: galleryTypes } = useQuery<GalleryType[]>({
        queryKey: ['gallery-types'],
        queryFn: async () => {
            const res = await get({ endpoint: '/gallery-types' });
            return res.data.data;
        },
        staleTime: 60_000,
    });

    // Fetch galleries
    const { data: galleries, refetch } = useQuery<GalleryItem[]>({
        queryKey: ['galleries', activeType],
        queryFn: async () => {
            if (activeType === 'all') {
                let all: GalleryItem[] = [];
                for (const type of galleryTypes || []) {
                    const res = await post({ endpoint: '/galleries/list-by-type', data: { type_id: type.id } });
                    all = all.concat(res.data.data);
                }
                return all;
            } else {
                const res = await post({ endpoint: '/galleries/list-by-type', data: { type_id: activeType } });
                return res.data.data;
            }
        },
        enabled: !!galleryTypes,
        staleTime: 60_000,
    });

    const handleTypeClick = (typeId: number | 'all') => {
        setActiveType(typeId);
        refetch();
    };

    return (
        <div className="section-padding">
            <div className="container">
                <div className="banner_title mb-6">{t("gallery")}</div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 px-3 sm:px-4 lg:px-6">
                    <button
                        onClick={() => handleTypeClick('all')}
                        className={`px-4 py-1.5 text-sm rounded-full border ${activeType === 'all'
                            ? 'bg-[#2e73ba] text-white border-[#653332]'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        {t("all")}
                    </button>

                    {galleryTypes?.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleTypeClick(type.id)}
                            className={`px-4 py-1.5 text-sm rounded-full border ${activeType === type.id
                                ? 'bg-[#2e73ba] text-white border-[#653332]'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {lang === 'en' ? type.title_en : type.title_kh}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="px-3 sm:px-4 lg:px-6 py-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6" ref={fancyboxRef}>
                        <AnimatePresence mode="popLayout">
                            {galleries?.map((gallery) => {
                                const images: string[] = gallery.image_gallerys || [];
                                const firstImage = images[0];
                                if (!firstImage) return null;

                                const title = lang === 'en' ? gallery.title_en : gallery.title_kh;

                                return (
                                    <motion.a
                                        key={gallery.id}
                                        href={firstImage}
                                        data-fancybox="gallery"
                                        className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md block"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        layout
                                    >
                                        <Image
                                            src={firstImage}
                                            alt={title}
                                            width={640}
                                            height={360}
                                            loading="lazy"
                                            className="w-full h-48 md:h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
                                        />
                                    </motion.a>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
