'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function VisionMissionCoreValueCom() {
    const { t } = useTranslation()

    // Use "as" casting to avoid TypeScript errors
    const visionList = t('visionMissionCoreValue.visionList', { returnObjects: true }) as string[]
    const missionList = t('visionMissionCoreValue.missionList', { returnObjects: true }) as string[]
    const coreValues = t('visionMissionCoreValue.coreValuesList', { returnObjects: true }) as Record<string, { title: string; items: string[] }>

    return (
        <div className="section-padding py-10">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 khmer-text">
                        {/* Vision Section */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-semibold mb-4">{t('visionMissionCoreValue.vision')}</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">{t('visionMissionCoreValue.visionDesc')}</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {visionList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Mission Section */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-semibold mb-4">{t('visionMissionCoreValue.mission')}</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">{t('visionMissionCoreValue.missionDesc')}</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {missionList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Core Values Section */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">{t('visionMissionCoreValue.coreValues')}</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">{t('visionMissionCoreValue.coreValuesDesc')}</p>
                            <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6">
                                {Object.keys(coreValues).map((key) => (
                                    <div key={key} className="p-4 bg-white rounded-lg shadow">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{coreValues[key].title}</h3>
                                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                                            {coreValues[key].items.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
