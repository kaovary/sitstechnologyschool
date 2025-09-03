'use client'
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function LocationCom() {
    const { t } = useTranslation();

    return (
        <div className='section-padding'>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                        {/* Location Section */}
                        <section className="mb-5 text-center">
                            <h1 className="mb-4">{t('locationPage.locate')}</h1>
                            <p className="khmer-text mt-2">
                                {t('locationPage.desc')}
                            </p>
                        </section>

                        {/* Google Maps Embed */}
                        <section className="rounded-xl text-center">
                            <h3 className='mb-3'>{t('locationPage.find')}</h3>
                            <div className="w-full h-80">
                                <iframe
                                    className="w-full h-full rounded-lg shadow-md"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.4077383611625!2d103.86107797367873!3d13.352043706426102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110170025c9f06d%3A0x6d29b40b6e9e0c6c!2sSITS%20Information%20Technology%20School!5e1!3m2!1sen!2skh!4v1743217691779!5m2!1sen!2skh"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
