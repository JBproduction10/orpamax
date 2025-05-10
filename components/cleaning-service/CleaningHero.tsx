'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { Button } from '../ui/button'
import Link from 'next/link'

const heroImages = [
  '/assets/images/cleaning-window.jpg',
  '/assets/images/cleaning-office.jpg',
  '/assets/images/cleaning-home.jpg'
]

// Replace this with your actual logo path
const logoPath = '/orpamax/fulllogo_transparent.png'

const CleaningHero = () => {
  return (
    <div className="relative h-[700px] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full w-full"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            {/* Background image */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            {/* Gradient overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent z-10" /> */}

            {/* Logo watermark */}
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <img
                src={logoPath}
                alt="Logo Watermark"
                className="opacity-30 w-[60%] max-w-[500px]"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Professional Cleaning Services
                </h1>
                <p className="text-xl mb-8">
                  Creating spotless environments for homes and businesses. Our
                  expert cleaning team delivers exceptional results every time.
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
                >
                  <Link href="/quotes">Book Cleaning Service</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CleaningHero
