'use client'

import React from 'react'
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { FaHome, FaBuilding, FaBroom, FaTruckMoving } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type Service = {
  _id: string;
  title: string;
  description: string;
  imageUrl: {
    secure_url: string;
  };
  iconName: string;
};

const iconMap: Record<string, React.ElementType> = {
  FaHome,
  FaBuilding,
  FaBroom,
  FaTruckMoving,
};

const CleaningServices = () => {
  const { data } = useSWR<{ services: Service[] }>('/api/cleaning/services', fetcher);
  const cleaningServices = data?.services ?? [];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Cleaning Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We offer a comprehensive range of cleaning services to meet your specific needs.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={24}
        slidesPerView={4}
        loop={true}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {cleaningServices.map((service, index) => {
          const Icon = iconMap[service.iconName] || FaHome;

          return (
            <SwiperSlide key={index}>
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.imageUrl?.secure_url}
                    alt={service.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="text-blue-600 mr-2" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CleaningServices;
