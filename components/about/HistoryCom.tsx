'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';

export default function HistoryCom() {
    const { t } = useTranslation();

    return (
        <div className="section-padding py-10">
            <div className="container">
                <div className="row">
                    {/* Main Content */}
                    <div className="col-md-12">
                        {/* History Section */}
                        <section className="khmer-text mb-10">
                            <h2 className="text-2xl font-semibold mb-4">
                                {t("history.ourHistory")}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {t("history.desc")}
                            </p>
                        </section>

                        {/* Logo Meaning Section */}
                        <section className="khmer-text">
                            <h2 className="text-2xl font-semibold mb-4">
                                {t("history.logo")}
                            </h2>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <Image
                                    src="/assets/img/logo.png"
                                    alt="School Logo"
                                    width={150}
                                    height={150}
                                />
                                <p className="text-gray-700 leading-relaxed">
                                    {t("history.list")} <br />
                                    <span className="block mt-2">- {t("history.list1")}</span>
                                    <span className="block">- {t("history.list2")}</span>
                                    <span className="block">- {t("history.list3")}</span>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
