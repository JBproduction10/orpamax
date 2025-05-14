'use client';

import React from 'react';
import useSWR from 'swr';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { iconOptions } from '@/lib/constants/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


const fetcher = (url: string) => fetch(url).then(res => res.json());

const TranslationServices = () => {
  const { data: services = [], mutate } = useSWR('/api/admin/translation/services', fetcher);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await fetch(`/api/admin/translation/services/${id}`, {
        method: 'DELETE',
      });
      mutate();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Translation Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We offer a comprehensive range of translation services to meet your specific needs.
        </p>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service: any) => {
          //   const Icon = iconOptions[service.icon] || iconOptions['FaFileAlt'];

            return (
              <SwiperSlide key={service._id}>
                <Card
                  className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.imageUrl.secure_url}
                      alt={service.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {/* <i className="text-blue-600 mr-2">
                        <Icon className="w-5 h-5" />
                      </i> */}
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};

export default TranslationServices;
