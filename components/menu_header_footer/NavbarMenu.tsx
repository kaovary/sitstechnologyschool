"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";

interface SubMenu {
  id: number;
  title: string;
  href: string;
}

interface MenuItem {
  id: number;
  title: string;
  href?: string;
  submenu?: SubMenu[];
}

type CurriculumType = {
  id: number;
  title_en: string;
  title_kh: string;
  image?: string;
};

// Helper to normalize slugs
const normalizeSlug = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

// fetch curriculum types from API
const fetchCurriculumTypes = async () => {
  const res = await post({ endpoint: "/curriculum-types", data: {} });
  return res;
};

export default function NavbarMenu() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["curriculum-types"],
    queryFn: fetchCurriculumTypes,
    staleTime: 60_000,
  });

  const curriculumTypes: CurriculumType[] = Array.isArray(data?.data)
    ? data.data
    : [];

  useEffect(() => {
    const dataMenu: MenuItem[] = [
      { id: 1, title: "Home", href: "/" },
      {
        id: 2,
        title: "About",
        href: "/about",
        submenu: [
          { id: 1, title: "History & Logo Meaning", href: "/about/history_logo" },
          { id: 2, title: "School Structure", href: "/about/school_structure" },
          { id: 3, title: "Vision Mission & Core Values", href: "/about/vision_mission_corevalue" },
          { id: 4, title: "Location", href: "/about/location" },
        ],
      },
      {
        id: 3,
        title: "Curriculums",
        href: "/curriculums",
        submenu: curriculumTypes.map((item) => ({
          id: item.id,
          title: item.title_en || item.title_kh,
          href: `/curriculums/${normalizeSlug(item.title_en)}`
        })),
      },
      { id: 4, title: "News", href: "/news" },
      { id: 5, title: "Gallerys", href: "/gallery" },
      { id: 6, title: "Contact", href: "/contact" },
    ];

    setMenuItems(dataMenu);
  }, [curriculumTypes]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  if (isLoading) return <div className="p-4">Loading menu...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load menu.</div>;

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-2">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <Image
            src="/assets/img/logo_long.png"
            width={200}
            height={60}
            alt="logo"
            priority
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav p-4 ms-3 p-lg-0">
            {menuItems.map((item) =>
              item.submenu ? (
                <div className="nav-item dropdown" key={item.id}>
                  <Link
                    href={item.href || "#"}
                    className={`nav-link dropdown-toggle ${isActive(item.href || "") ? "menu_active" : ""}`}
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {item.title}
                  </Link>
                  <div className="dropdown-menu bg-light m-0">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.id}
                        href={subitem.href}
                        className={`dropdown-item ${isActive(subitem.href) ? "menu_active" : ""}`}
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.href!}
                  className={`nav-item nav-link ${isActive(item.href!) ? "menu_active" : ""}`}
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
