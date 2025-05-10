"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, {useState} from 'react'
import CleaningHero from '@/components/cleaning-service/CleaningHero';
import CleaningServices from '@/components/cleaning-service/CleaningServices';
import CleaningPackages from '@/components/cleaning-service/CleaningPackages';
import CleaningProcess from '@/components/cleaning-service/CleaningProcess';
import CleaningCheklist from '@/components/cleaning-service/CleaningCheklist';
import CleaningBooking from '@/components/cleaning-service/CleaningBooking';

const page = () => {
    const [message, setMessage] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedService, setSelectedService] = useState("");

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
    <>
              {/* Hero Section */}
              <CleaningHero/>
              {/* Services */}
              <CleaningServices/>
              {/* Cleaning Packages */}
              <CleaningPackages/>
              {/* Cleaning Process */}
              <CleaningProcess/>
              {/* Cleaning Checklist */}
              <CleaningCheklist/>
              {/* Booking Calendar */}
              <CleaningBooking 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
                selectedTime={selectedTime} 
                setSelectedTime={setSelectedTime} 
                selectedService={selectedService} 
                setSelectedService={setSelectedService} 
                message={message} 
                setMessage={setMessage}
                />
              {/* Before/After Gallery */}
              {/* <div className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                      Before & After Gallery
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      See the transformative results of our professional cleaning
                      services.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[
                      {
                        title: "Kitchen Transformation",
                        before:
                          "https://readdy.ai/api/search-image?query=Messy%20dirty%20kitchen%20with%20unwashed%20dishes%2C%20stained%20countertops%2C%20cluttered%20surfaces%2C%20food%20debris%2C%20unorganized%20items%2C%20realistic%20photo&width=500&height=300&seq=15&orientation=landscape",
                        after:
                          "https://readdy.ai/api/search-image?query=Spotless%20clean%20kitchen%20with%20gleaming%20countertops%2C%20organized%20space%2C%20shining%20appliances%2C%20immaculate%20sink%2C%20everything%20perfectly%20arranged%2C%20bright%20and%20fresh%2C%20realistic%20photo&width=500&height=300&seq=16&orientation=landscape",
                      },
                      {
                        title: "Office Space Cleaning",
                        before:
                          "https://readdy.ai/api/search-image?query=Messy%20cluttered%20office%20with%20papers%20everywhere%2C%20dusty%20surfaces%2C%20untidy%20desk%2C%20coffee%20stains%2C%20disorganized%20cables%2C%20realistic%20photo&width=500&height=300&seq=17&orientation=landscape",
                        after:
                          "https://readdy.ai/api/search-image?query=Perfectly%20organized%20clean%20office%20with%20neat%20desk%2C%20dust-free%20surfaces%2C%20properly%20arranged%20items%2C%20clean%20floor%2C%20professional%20appearance%2C%20bright%20and%20fresh%2C%20realistic%20photo&width=500&height=300&seq=18&orientation=landscape",
                      },
                    ].map((gallery, index) => (
                      <Card
                        key={index}
                        className="border-2 border-blue-100 overflow-hidden"
                      >
                        <CardHeader>
                          <CardTitle className="text-center">
                            {gallery.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="grid grid-cols-2">
                            <div className="relative">
                              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                Before
                              </div>
                              <img
                                src={gallery.before}
                                alt={`${gallery.title} Before`}
                                className="w-full h-64 object-cover object-top"
                              />
                            </div>
                            <div className="relative">
                              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                After
                              </div>
                              <img
                                src={gallery.after}
                                alt={`${gallery.title} After`}
                                className="w-full h-64 object-cover object-top"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div> */}
              {/* Testimonials */}
              {/* <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Cleaning Client Testimonials
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    What our cleaning clients say about our services.
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
                      .filter((t) => t.service === "cleaning")
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
                                  Cleaning
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
              {/* CTA */}
              <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-5xl mx-auto bg-blue-600 rounded-lg overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                          Ready for a Spotless Space?
                        </h2>
                        <p className="text-blue-100 mb-6">
                          Book our professional cleaning services today and
                          experience the difference a truly clean environment
                          makes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            size="lg"
                            variant="secondary"
                            className="!rounded-button whitespace-nowrap"
                          >
                            <Link href="/quotes">Book Now</Link>
                          </Button>
                          <Link
                            href="/contact-us"
                            data-readdy="true"
                          >
                            <Button
                              size="lg"
                              variant="outline"
                              className="bg-transparent border-white text-white hover:bg-white/10 !rounded-button whitespace-nowrap"
                            >
                              Contact Us
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="hidden md:block relative overflow-hidden">
                        <img
                          src="/assets/images/cleaning.jpg"
                          alt="Cleaning Services"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
  )
}

export default page