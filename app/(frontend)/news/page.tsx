import React from 'react'
import NewsComponent from '@/components/news/NewsComponent';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const metadata = {
    title: "News - SITS Information Technology School",
    description: "ស្វែងយល់អំពី SITS Information Technology School",
    openGraph: {
        title: "News - SITS Information Technology School",
        description: "ស្វែងយល់អំពី SITS Information Technology School",
        url: `${baseUrl}/news`,
        siteName: "SITS Information Technology School",
        locale: "en_US",
        type: "website",
    },
};

export default function News() {
    return (
        <div className="section-padding">
            <div className="container">
                <NewsComponent />
            </div>
        </div>
    )
}
