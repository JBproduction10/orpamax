"use client"

import { Pagination, Autoplay } from "swiper/modules";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from 'next/link'
import { testimonials } from '@/data'
import TranslationHero from '@/components/translation-service/TranslationHero'
import TranslationServices from '@/components/translation-service/TranslationServices'
import TranslationLanguages from '@/components/translation-service/TranslationLanguages'
import TranslationProcess from '@/components/translation-service/TranslationProcess'
import TranslationBooking from '@/components/translation-service/TranslationBooking'
import TranslationFaq from '@/components/translation-service/TranslationFaq'

const page = () => {
 
  return (
    <>
      {/* Hero Section */}
      <TranslationHero/>
      {/* Services */}
      <TranslationServices/>
      {/* Languages */}
      <TranslationLanguages/>
      {/* Translation Process */}
      <TranslationProcess/>
      {/* Translation Calculator */}
      <TranslationBooking/>
      {/* Testimonials */}
      {/* <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Translation Client Testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What our translation clients say about our services.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <Swiper
            modules={swiperModules}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="pb-12"
          >
            {testimonials
              .filter((t) => t.service === "translation")
              .map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <Card className="h-full border-2 border-blue-100">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-lg">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {testimonial.company}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-blue-50">
                          Translation
                        </Badge>
                      </div>
                      <div className="mb-2 text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <p className="text-gray-700 italic">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div> */}
      {/* FAQ */}
      <TranslationFaq/>
      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Break Language Barriers?
              </h2>
              <p className="text-blue-100 mb-6">
                Get started with our professional translation services
                today and reach a global audience with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="!rounded-button whitespace-nowrap"
                >
                  <Link href="/quotes">Request a Quote</Link>
                </Button>
                <a
                  href="https://readdy.ai/home/61db536b-a10e-43f4-b3d4-43003c996852/99eb6e53-6e39-4bb2-9aab-ed72e2046f5e"
                  data-readdy="true"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10 !rounded-button whitespace-nowrap"
                  >
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block relative overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20translation%20service%20concept%20with%20global%20communication%2C%20multilingual%20documents%2C%20and%20digital%20translation%20tools%2C%20modern%20office%20setting%20with%20blue%20color%20theme%2C%20professional%20workspace%20with%20translation%20materials&width=600&height=500&seq=13&orientation=portrait"
                alt="Translation Services"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page