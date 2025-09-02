import ComputerCom from '@/components/curriculums/computer/ComputerCom'
import CurriculumListClient from '@/components/curriculums/CurriculumListClient';
import React from 'react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const metadata = {
    title: "Computer Course - SITS Information Technology School",
    description: "ស្វែងយល់អំពី SITS Information Technology School",
    openGraph: {
        title: "Computer Course - SITS Information Technology School",
        description: "ស្វែងយល់អំពី SITS Information Technology School",
        url: `${baseUrl}/curriculums/computer`,
        siteName: "SITS Information Technology School",
        locale: "en_US",
        type: "website",
    },
};

export default function page() {
    return (
        <div>
            {/* <ComputerCom /> */}
            <CurriculumListClient />
        </div>
    )
}
