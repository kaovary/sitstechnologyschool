"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { post } from "@/app/lib/api";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import SwitchLanguage from "../SwitchLanguage";
import { FaAngleRight } from "react-icons/fa";

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

const normalizeSlug = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

const fetchCurriculumTypes = async () => {
  const res = await post({ endpoint: "/curriculum-types", data: {} });
  return res;
};

export default function NavbarMenu() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      { id: 1, title: t("home"), href: "/" },
      {
        id: 2,
        title: t("about"),
        href: "/about",
        submenu: [
          { id: 1, title: t("historyLogo"), href: "/about/history_logo" },
          { id: 2, title: t("schoolStructure"), href: "/about/school_structure" },
          { id: 3, title: t("visionMissionCore"), href: "/about/vision_mission_corevalue" },
          { id: 4, title: t("location"), href: "/about/location" },
        ],
      },
      {
        id: 3,
        title: t("curriculums"),
        href: "/curriculums",
        submenu: curriculumTypes.map((item) => ({
          id: item.id,
          title: currentLang === "en" ? item.title_en : item.title_kh,
          href: `/curriculums/${normalizeSlug(item.title_en)}`,
        })),
      },
      { id: 4, title: t("news"), href: "/news" },
      { id: 5, title: t("gallery"), href: "/gallery" },
      { id: 6, title: t("contact"), href: "/contact" },
    ];

    setMenuItems(dataMenu);
  }, [curriculumTypes, i18n.language]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  if (isLoading) return <div className="p-4">Loading menu...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load menu.</div>;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <style>{`
        .dropdown-toggle::after {
          border: none;
          content: "\\f107";
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          vertical-align: middle;
          margin-left: 8px;
        }
        .dropdown:hover > .dropdown-menu {
          display: block;
        }
      `}</style>

      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/img/logo_long.png"
            width={180}
            height={50}
            alt="logo"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center">
          {menuItems.map((item) => (
            <li key={item.id} className={`relative ${item.submenu ? "dropdown" : ""}`}>
              <Link
                href={item.href || "#"}
                className={`px-3 py-2 font-medium transition ${item.submenu ? "dropdown-toggle hover:text-white hover:bg-[#2e73ba]" : ""} ${isActive(item.href || "") ? "text-[#2e73ba]" : "text-gray-700"}`}
              >
                {item.title}
              </Link>
              {item.submenu && (
                <ul className="dropdown-menu absolute left-0 mt-2 w-52 bg-white shadow-lg rounded-lg hidden">
                  {item.submenu.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={sub.href}
                        className={`block px-4 py-2 hover:text-white hover:bg-[#2e73ba] transition ${isActive(sub.href) ? "text-[#2e73ba]" : "text-gray-700"}`}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="lg:hidden p-2 rounded-full bg-[#2e73ba] text-white shadow-md transition focus:outline-none focus:ring-2"
        >
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-40 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <SwitchLanguage />
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col p-4 gap-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.submenu ? (
                <details className="group">
                  <summary className="cursor-pointer px-3 py-2 rounded-md hover:text-white hover:bg-[#2e73ba] flex justify-between items-center transition">
                    <span
                      className={`${isActive(item.href || "") ? "text-[#2e73ba]" : "text-gray-700"} group-hover:text-white`}
                    >
                      {item.title}
                    </span>
                    <span className="text-gray-500 group-open:rotate-90 transition">
                      <FaAngleRight />
                    </span>
                  </summary>
                  <ul className="pl-5 mt-2 flex flex-col gap-1">
                    {item.submenu.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={sub.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`block px-3 py-2 rounded-md hover:text-white hover:bg-[#2e73ba] transition ${isActive(sub.href) ? "text-[#2e73ba]" : "text-gray-700"}`}
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link
                  href={item.href!}
                  onClick={() => setDrawerOpen(false)}
                  className={`block px-3 py-2 rounded-md hover:text-white hover:bg-[#2e73ba] transition ${isActive(item.href!) ? "text-[#2e73ba]" : "text-gray-700"}`}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </nav>
  );
}
