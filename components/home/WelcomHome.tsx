import React from "react";
import { useTranslation } from "react-i18next";

export default function WelcomHome() {
    const { t } = useTranslation();

    return (
        <div className="section-padding">
            <div className="container khmer-text wow fadeInUp" data-wow-delay="0.1s">
                <h2 className="text-center">{t("homePage.welComStudy")}</h2>
                <div className="mt-3 w-[80%] text-justify mx-auto">
                    {t("homePage.descStudy")}
                </div>
            </div>
        </div>
    );
}
