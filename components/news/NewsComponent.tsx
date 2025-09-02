"use client";

import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type NewsItem = {
    id: number;
    title_en?: string | null;
    title_kh?: string | null;
    short_description_en?: string | null;
    short_description_kh?: string | null;
    image?: string | null;
};

export default function NewsListClient() {
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentNews, setCurrentNews] = useState<NewsItem[]>([]);

    // Fetch all news
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news", "listall"],
        queryFn: () => post({ endpoint: "/news/listall", data: {} }),
        staleTime: 60_000,
    });

    const news: NewsItem[] = Array.isArray(data?.data) ? data.data : [];
    const totalPages = Math.ceil(news.length / itemsPerPage) || 1;

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentNews(news.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, news]);

    const normalizeImage = (img?: string | null) =>
        img ? (img.startsWith("http") ? img : `/${img.replace(/^\/+/, "")}`) : null;

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to load news.</div>;
    if (!currentNews.length) return <div>No news found.</div>;

    return (
        <div>
            <div className="row">
                {currentNews.map((item) => {
                    const img = normalizeImage(item.image);
                    return (
                        <div key={item.id} className="col-lg-6 mt-3 wow fadeInUp">
                            <div className="banner_border shadow-md flex flex-col lg:flex-row gap-4">
                                <Link href={`/news/${item.id}`} className="image_border">
                                    {img ? (
                                        <Image
                                            src={img}
                                            alt={item.title_en || item.title_kh || "News"}
                                            width={300}
                                            height={250}
                                            className="rounded-md object-cover"
                                        />
                                    ) : (
                                        <div className="w-72 h-60 bg-gray-200 rounded-md flex items-center justify-center">
                                            No Image
                                        </div>
                                    )}
                                </Link>
                                <div className="lg:w-2/3 leading-relaxed">
                                    <Link href={`/news/${item.id}`}>
                                        <h3>{item.title_en || item.title_kh}</h3>
                                    </Link>
                                    <p>{item.short_description_en || item.short_description_kh}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="pagination justify-content-end mt-4">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li
                                key={i + 1}
                                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                            >
                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
