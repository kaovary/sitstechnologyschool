"use client"
import React, { useState } from 'react'
import FormContact from '../contact/FormContact'
import { useTranslation } from 'react-i18next';

export default function Appointment() {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className="courses">
                <div className="container">
                    <div className="row g-4 justify-content-center pb-5">
                        <div className="col-lg-8 my-6 mb-0 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-primary text-center p-5">
                                <h5 className="mb-4 contact-title">{t("homePage.question")}</h5>
                                <FormContact />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
