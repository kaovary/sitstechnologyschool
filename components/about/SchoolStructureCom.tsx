"use client"
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';

export default function SchoolStructureCom() {
  const { t } = useTranslation();

  const principals = [
    { name: t("principal1Name"), role: t("principal"), period: `2017-${t("now")}`, img: "/assets/img/team-1.jpg" },
    { name: t("principal2Name"), role: t("formerPrincipal"), period: "2016-2017", img: "/assets/img/team-2.jpg" },
    { name: t("principal3Name"), role: t("formerPrincipal"), period: "2015-2016", img: "/assets/img/team-3.jpg" },
  ];

  const teachers = [
    { name: t("teacher1Name"), role: t("flpTeacher"), img: "/assets/img/team-1.jpg" },
    { name: t("teacher2Name"), role: t("flpTeacher"), img: "/assets/img/team-2.jpg" },
    { name: t("teacher3Name"), role: t("flpTeacher"), img: "/assets/img/team-3.jpg" },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-20 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Our Journey */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2e73ba] mb-6 text-center">{t("ourJourney")}</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed text-center sm:text-left">
              {t("journeyDescription")}
            </p>
          </div>
        </section>

        {/* Principals */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2e73ba] mb-8 text-center">{t("ourPrincipals")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {principals.map((p, idx) => (
              <div key={idx} className="text-center">
                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#2e73ba] shadow-lg hover:shadow-2xl bg-white flex items-center justify-center transition-shadow duration-300">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-[#2e73ba] font-medium">{p.role}</p>
                <p className="text-sm text-gray-600">{p.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teachers */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2e73ba] mb-8 text-center">{t("ourTeachers")}</h2>

          {/* Foreign Language Programme */}
          <div className="mb-10">
            {/* <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">{t("foreignLanguageProgramme")}</h3> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teachers.map((tch, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-36 h-48 sm:w-44 sm:h-52 md:w-48 md:h-60 mx-auto mb-4 rounded-lg overflow-hidden border-4 border-[#2e73ba] shadow-lg hover:shadow-2xl bg-white flex items-center justify-center transition-shadow duration-300">
                    <Image
                      src={tch.img}
                      alt={tch.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h4 className="font-semibold text-lg">{tch.name}</h4>
                  <p className="text-[#2e73ba] font-medium">{tch.role}</p>
                </div>
              ))}
            </div>
          </div>


          {/* Khmer Programme */}
          {/* <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">{t("khmerProgramme")}</h3>
            <p className="text-gray-600 italic text-center">{t("khmerTeachersComingSoon")}</p>
          </div> */}
        </section>

        {/* Communities */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2e73ba] mb-8 text-center">{t("communities")}</h2>
          <div className="mb-6">
            <Image
              src="/assets/img/about-3.jpg"
              alt="Community Engagement"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="text-gray-700 leading-relaxed text-center sm:text-left">
                {t("communityDescription")}
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
