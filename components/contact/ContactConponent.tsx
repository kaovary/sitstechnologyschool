"use client"
import React from 'react'
import FormContact from './FormContact'
import { useTranslation } from 'react-i18next';

export default function ContactComponent() {
    const { t, i18n } = useTranslation();

    return (
        <div className="container-xxl py-6">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="position-relative h-100">
                            <iframe
                                className="position-relative w-100 h-100"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.4077383611625!2d103.86107797367873!3d13.352043706426102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110170025c9f06d%3A0x6d29b40b6e9e0c6c!2sSITS%20Information%20Technology%20School!5e1!3m2!1sen!2skh!4v1743217691779!5m2!1sen!2skh"
                                frameBorder={0}
                                style={{ minHeight: 450, border: 0 }}
                                allowFullScreen={true}
                                aria-hidden="false"
                                tabIndex={0}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="text-primary text-uppercase mb-2">{t("contact")}</h6>
                        <h5 className="mb-4">{t("question")}</h5>
                        {/* Form Contact */}
                        <FormContact />
                    </div>
                </div>
            </div>
        </div>
    )
}
