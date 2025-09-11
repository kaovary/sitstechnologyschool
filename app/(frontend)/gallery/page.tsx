import GalleryCom from '@/components/gallery/GalleryCom'
import VideoCom from '@/components/gallery/VideoCom';
import React from 'react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const metadata = {
    title: "Gallery - SITS Information Technology School",
    description: "ស្វែងយល់អំពី SITS Information Technology School",
    openGraph: {
        title: "Gallery - SITS Information Technology School",
        description: "ស្វែងយល់អំពី SITS Information Technology School",
        url: `${baseUrl}/gallery`,
        siteName: "SITS Information Technology School",
        locale: "en_US",
        type: "website",
    },
};

export default function page() {
    return (
        <div>
            <VideoCom />
            <GalleryCom />
        </div>
    )
}
