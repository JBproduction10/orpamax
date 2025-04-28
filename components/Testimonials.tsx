import { Badge } from './ui/badge'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Testimonials = () => {
    const swiperModules = [Pagination, Autoplay];

    const testimonials = [
        {
          name: "Sarah Johnson",
          company: "Global Tech Solutions",
          text: "The translation services provided were exceptional. Our technical documentation was translated with perfect accuracy and delivered ahead of schedule.",
          service: "translation",
        },
        {
          name: "Michael Chen",
          company: "Legal Partners LLP",
          text: "We've been using their legal translation services for over 3 years now. Their attention to detail and understanding of legal terminology is outstanding.",
          service: "translation",
        },
        {
          name: "David Williams",
          company: "Sunshine Properties",
          text: "Their cleaning team transformed our office space. Professional, thorough, and reliable. We've now signed up for weekly maintenance.",
          service: "cleaning",
        },
        {
          name: "Emily Rodriguez",
          company: "Creative Studios",
          text: "The deep cleaning service exceeded our expectations. Our studio space has never looked better. Highly recommend their eco-friendly options!",
          service: "cleaning",
        },
      ];
  return (
    <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    What Our Clients Say
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Hear from our satisfied customers about their experience with
                    our services.
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
                    {testimonials.map((testimonial, index) => (
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
                                {testimonial.service === "translation"
                                  ? "Translation"
                                  : "Cleaning"}
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
              </div>
  )
}

export default Testimonials