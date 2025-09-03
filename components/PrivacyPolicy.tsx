"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div>
            <div className="container py-10">
                <h1 className="text-2xl font-bold mb-4">{t("policy.policy")}</h1>
                <p className="mb-4">{t("policy.policy2")}</p>
                <p className="mb-4">{t("policy.policy1")}</p>
                <p className="mb-4">
                    {t("policy.list")}
                    <ul className="list-disc list-inside ml-4">
                        <li>{t("policy.list1")}</li>
                        <li>{t("policy.list2")}</li>
                        <li>{t("policy.list3")}</li>
                    </ul>
                </p>
                <p className="mb-4">{t("policy.wonder")}</p>
            </div>
        </div>
    )
}
