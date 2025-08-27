"use client";

import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type NewsItem = {
    id: number;
    title_en?: string | null;
    title_kh?: string | null;
    short_description_en?: string | null;
    short_description_kh?: string | null;
    image?: string | null;
};

export default function NewsListClient() {
    // Fetch news
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news", "listall"],
        queryFn: () => post({ endpoint: "/news/listall", data: {} }),
        staleTime: 60_000,
    });

    // Extract news array safely
    const news: NewsItem[] = Array.isArray(data?.data) ? data.data : [];

    // Pagination
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page") ?? "1");
    const currentPage = page < 1 || Number.isNaN(page) ? 1 : page;
    const itemsPerPage = 8;
    const totalPages = Math.ceil(news.length / itemsPerPage) || 1;
    const safePage = Math.min(currentPage, totalPages);
    const currentNews = news.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

    // Normalize image path
    const normalizeImage = (img?: string | null) =>
        img ? (img.startsWith("http") ? img : `/${img.replace(/^\/+/, "")}`) : null;

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to load news.</div>;
    if (!currentNews.length) return <div>No news found.</div>;

    return (
        <>
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
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <li key={p} className={`page-item ${safePage === p ? "active" : ""}`}>
                            <Link href={`/news?page=${p}`} className="page-link">{p}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
