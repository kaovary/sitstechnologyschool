"use client"
import React from 'react'
import SlideHome from './SlideHome'
import AboutIndroduction from './AboutIndroduction'
import PartnerComponent from './PartnerComponent'
import Appointment from './Appointment'
import WelcomHome from './WelcomHome'
import WhyStudy from './WhyStudy'
import CurriculumsItemHome from '../curriculums/CurriculumsItemHome'
import NewHome from '../news/NewHome'


export default function HomeIndexComponent() {
    return (

        <>
            <SlideHome />
            <WelcomHome />
            <AboutIndroduction />
            <WhyStudy />
            <PartnerComponent />
            <CurriculumsItemHome />
            <NewHome />
            <Appointment />
        </>

    )
}
