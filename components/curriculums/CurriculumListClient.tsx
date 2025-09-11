"use client";

import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type CurriculumItem = {
    id: number;
    title_en?: string;
    title_kh?: string;
    short_description_en?: string;
    short_description_kh?: string;
    image?: string | null;
    curriculum_type_id: number;
};

type CurriculumType = {
    id: number;
    title_en: string;
    title_kh: string;
};

const normalizeSlug = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "-");

export default function CurriculumListByType() {
    const { t, i18n } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<CurriculumItem[]>([]);

    // Fetch all curriculum types
    const { data: typesData } = useQuery({
        queryKey: ["curriculum-types"],
        queryFn: () => post({ endpoint: "/curriculum-types", data: {} }),
        staleTime: 60_000,
    });

    const types: CurriculumType[] = Array.isArray(typesData?.data)
        ? typesData.data
        : [];

    const type = types.find(
        (t) => normalizeSlug(t.title_en) === slug
    );
    const typeId = type?.id;

    // Fetch items for this type
    const { data } = useQuery({
        queryKey: ["curriculum-items", typeId],
        queryFn: () =>
            typeId
                ? post({
                    endpoint: "/curriculum-items/list-by-type",
                    data: { type_id: typeId },
                })
                : Promise.resolve({ data: [] }),
        enabled: !!typeId,
    });

    const items: CurriculumItem[] = Array.isArray(data?.data)
        ? data.data
        : [];
    const totalPages = Math.ceil(items.length / itemsPerPage) || 1;

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(items.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, items]);

    const normalizeImage = (img?: string | null) =>
        img
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img.replace(/^\/+/, "")}`
            : null;

    // Helpers for language
    const getTitle = (item: CurriculumItem) =>
        i18n.language === "kh"
            ? item.title_kh || item.title_en
            : item.title_en || item.title_kh;

    const getDescription = (item: CurriculumItem) =>
        i18n.language === "kh"
            ? item.short_description_kh || item.short_description_en
            : item.short_description_en || item.short_description_kh;

    const getTypeTitle = (type: CurriculumType) =>
        i18n.language === "kh" ? type.title_kh : type.title_en;

    if (!type) return <div>{t("Loading...")}</div>;
    if (!items.length)
        return (
            <div className="text-center py-10 text-gray-600">
                {t("Loading...")}
            </div>
        );

    return (
        <div className="section-padding">
            <div className="container">
                <h2 className="banner_title mb-4">{getTypeTitle(type)}</h2>
                <div className="row g-4">
                    {currentItems.map((item) => {
                        const img = normalizeImage(item.image);
                        return (
                            <div
                                key={item.id}
                                className="col-lg-3 col-md-3 col-sm-6"
                            >
                                <div className="courses-item d-flex flex-column bg-white overflow-hidden h-full rounded shadow-sm">
                                    <div className="relative w-full h-[200px]">
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={getTitle(item) || "Curriculum"}
                                                fill
                                                className="object-cover rounded-t-md"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">
                                                    {t("noImage")}
                                                </span>
                                            </div>
                                        )}
                                        <div className="courses-overlay absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <Link
                                                href={`/curriculums/${slug}/${item.id}`}
                                                className="btn btn-outline-primary border-2"
                                            >
                                                {t("viewDetail")}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-2 relative">
                                        <Link
                                            href={`/curriculums/${slug}/${item.id}`}
                                            className="mb-3 des-title"
                                        >
                                            <span>{getTitle(item)}</span>
                                        </Link>
                                        <p className="text-sm text-gray-600">
                                            {getDescription(item)}
                                        </p>
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
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                                    }
                                    disabled={currentPage === 1}
                                >
                                    {t("previous")}
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li
                                    key={i + 1}
                                    className={`page-item ${currentPage === i + 1 ? "active" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    {t("next")}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
