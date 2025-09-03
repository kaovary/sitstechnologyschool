"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TermCondition() {
    const { t } = useTranslation();

    return (
        <div className="container py-10">
            <h1 className="text-2xl font-bold mb-4">{t("termCondition.condition")}</h1>
            <p className="mb-4">{t("termCondition.list")}</p>
            <ul className="list-disc list-inside mb-4 ml-4">
                <li>{t("termCondition.list1")}</li>
                <li>{t("termCondition.list2")}</li>
                <li>{t("termCondition.list3")}</li>
                <li>{t("termCondition.list4")}</li>
            </ul>
            <p className="mb-4">{t("termCondition.wonder")}</p>
        </div>
    );
}
