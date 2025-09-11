'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()

    const [showQR1Popup, setShowQR1Popup] = useState(false)
    const [showQR2Popup, setShowQR2Popup] = useState(false)

    // Menu links array
    const links = [
        ['/', t('home')],
        ['/about', t('about')],
        ['/curriculums', t('curriculums')],
        ['/news', t('news')],
        ['/gallery', t('gallery')],
        ['/contact', t('contact')],
        ['/faq', t('faq')],
        ['/privacy-policy', t('privacyPolicy')],
        ['/term-condition', t('terms')],
    ]

    return (
        <>
            {/* Main Footer */}
            <div className="container-fluid bg_footer text-light py-4 my-2 mb-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row">
                        {/* Logo Section */}
                        <div className="col-lg-3 mb-4 mb-lg-0 text-center">
                            <div className="flex justify-center">
                                <Image src="/assets/img/logo.png" width={100} height={100} alt="SITS Logo" />
                            </div>
                            <h5 className="text-white mt-2">{t('school')}</h5>
                        </div>

                        {/* Helpful Links */}
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <h4 className="text-white mb-3">{t('homePage.moreInfo')}</h4>
                            <ul className="list-unstyled menu_footer menu-columns">
                                {links.map(([href, label], index) => (
                                    <li key={index}>
                                        <Link href={href}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Open Hours */}
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <h4 className="text-white mb-3">{t('openHours')}</h4>
                            <div className="d-flex flex-column gap-1">
                                <div className="d-flex justify-content-between">
                                    <p>{t('weekdays')}</p>
                                    <p>7:00am - 9:00pm</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>{t('weekend')}</p>
                                    <p>8:00am - 6:00pm</p>
                                </div>
                            </div>
                        </div>

                        {/* Follow Us / QR Section */}
                        <div className="col-lg-3">
                            <h4 className="text-white mb-3">{t('followUs')}</h4>
                            <div className="flex gap-3">
                                {/* QR Code 1 */}
                                <div onClick={() => setShowQR1Popup(true)} className="cursor-pointer">
                                    <Image
                                        src="/assets/qr-telegram.jpg"
                                        width={100}
                                        height={100}
                                        alt="qr-telegram"
                                        style={{ height: "99px" }}
                                        className="rounded-[10px]"
                                    />
                                </div>

                                {/* QR Code 2 */}
                                <div onClick={() => setShowQR2Popup(true)} className="cursor-pointer">
                                    <Image
                                        src="/assets/qr-facebook.jpg"
                                        width={100}
                                        height={100}
                                        alt="qr-facebook"
                                        className="rounded-[10px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <hr />
                <div className="container text-center text-white mt-2">
                    © {new Date().getFullYear()} All rights reserved — Powered by{' '}
                    <strong>SITS Information Technology School</strong>
                </div>
            </div>

            {/* Back to Top Button */}
            <Link href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up" />
            </Link>

            {/* QR Code Popups */}
            {showQR1Popup && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center animate-fade-in"
                    onClick={() => setShowQR1Popup(false)}
                >
                    <div className="bg-white p-4 rounded-[10px] shadow-lg scale-95 animate-zoom-in" onClick={(e) => e.stopPropagation()}>
                        <Image src="/assets/qr-telegram.jpg" width={300} height={300} alt="qr-telegram" className="rounded-[10px]" />
                    </div>
                </div>
            )}

            {showQR2Popup && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center animate-fade-in"
                    onClick={() => setShowQR2Popup(false)}
                >
                    <div className="bg-white p-4 rounded-[10px] shadow-lg scale-95 animate-zoom-in" onClick={(e) => e.stopPropagation()}>
                        <Image src="/assets/qr-facebook.jpg" width={300} height={300} alt="qr-facebook" className="rounded-[10px]" />
                    </div>
                </div>
            )}
        </>
    )
}
