"use client"
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';


export default function SchoolStructureCom() {
  const { t } = useTranslation();
  return (
    <>
      <div className="section-padding">
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 khmer-text'>
              {/* រចនាសម្ព័ន្ធការគ្រប់គ្រង */}
              <section className="mb-4">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">{t("structure")}</h1>
                <div className="flex justify-center mt-6">
                  <Image src="/assets/img/school_structure.png" alt="រចនាសម្ព័ន្ធសាលា" width={700} height={500} className="rounded-lg" />
                </div>
              </section>
            </div>
            {/* <div className='col-md-3'>
              <RelatedMenu />
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
