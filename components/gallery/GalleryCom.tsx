'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useFancybox from '@/store/FancyBoxGallery';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { get } from '@/app/lib/api'; // your GET helper

type GalleryType = {
    id: number;
    title: string;
};

type GalleryItem = {
    id: number;
    title: string;
    images: { id: number; image_path: string }[];
};

export default function GalleryCom() {
    const [fancyboxRef] = useFancybox();
    const [activeType, setActiveType] = useState<number | 'all'>('all');

    // Fetch gallery types
    const { data: galleryTypes } = useQuery<GalleryType[]>({
        queryKey: ['gallery-types'],
        queryFn: async () => {
            const res = await get({ endpoint: '/gallery/types' });
            return res.data;
        },
        staleTime: 60_000,
    });

    // Fetch galleries for the selected type
    const { data: galleries } = useQuery<GalleryItem[]>({
        queryKey: ['galleries', activeType],
        queryFn: async () => {
            if (activeType === 'all') {
                // fetch all galleries
                const allGalleries: GalleryItem[] = [];
                for (const type of galleryTypes || []) {
                    const res = await get({ endpoint: `/gallery/types/${type.id}/galleries` });
                    allGalleries.push(...res.data);
                }
                return allGalleries;
            } else {
                const res = await get({ endpoint: `/gallery/types/${activeType}/galleries` });
                return res.data;
            }
        },
        enabled: !!galleryTypes,
        staleTime: 60_000,
    });

    return (
        <div className="section-padding">
            <div className="container">
                <div className="banner_title mb-6">Photo Gallery</div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 px-3 sm:px-4 lg:px-6">
                    <button
                        onClick={() => setActiveType('all')}
                        className={`px-4 py-1.5 text-sm rounded-full border ${activeType === 'all'
                            ? 'bg-[#2e73ba] text-white border-[#653332]'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        All
                    </button>
                    {galleryTypes?.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveType(type.id)}
                            className={`px-4 py-1.5 text-sm rounded-full border ${activeType === type.id
                                ? 'bg-[#2e73ba] text-white border-[#653332]'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {type.title}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="px-3 sm:px-4 lg:px-6 py-4">
                    <div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6"
                        ref={fancyboxRef}
                    >
                        <AnimatePresence mode="popLayout">
                            {galleries?.map((gallery) =>
                                gallery.images.map((img) => (
                                    <motion.a
                                        key={img.id}
                                        href={img.image_path.startsWith('/') ? img.image_path : '/' + img.image_path}
                                        data-fancybox="gallery"
                                        className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md block"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        layout
                                    >
                                        <Image
                                            src={img.image_path.startsWith('/') ? img.image_path : '/' + img.image_path}
                                            alt={gallery.title}
                                            width={640}
                                            height={360}
                                            loading="lazy"
                                            className="w-full h-48 md:h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
                                        />
                                    </motion.a>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
