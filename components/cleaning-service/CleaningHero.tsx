'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/autoplay';
import { Button } from '../ui/button'
import Link from 'next/link'

export default function CleaningHeroSwiper() {
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/cleaning/hero')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSlides(data);
      });
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      loop={slides.length > 1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="h-[700px]"
    >
      {slides.map(slide => (
        <SwiperSlide key={slide._id}>
          <div
            className="relative h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image?.secure_url || '/fallback.jpg'})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.description}</p>
                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
                  >
                    <Link href="/quotes">Book Cleaning Service</Link>
                  </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
