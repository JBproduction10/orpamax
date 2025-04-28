"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from 'next/link'
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import React, {useState} from 'react'
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaBath, FaBed, FaBroom, FaBuilding, FaCalendarCheck, FaCheck, FaClipboardList, FaCouch, FaHome, FaSearch, FaSprayCan, FaTruckMoving, FaUtensils } from 'react-icons/fa';
import deepClean from "@/public/assets/images/deep-cleaning.jpg"
import commercialClean from "@/public/assets/images/cleaning-office.jpg"
import homeClean from "@/public/assets/images/cleaning.jpg"
import moveClean from "@/public/assets/images/post-construction.jpg"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Badge } from '@/components/ui/badge';

const page = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
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
    const cleaningServices = [
        {
          title: "Residential Cleaning",
          description:
            "Comprehensive home cleaning services tailored to your needs",
          icon: <FaHome/>,
          imageUrl:homeClean.src,
        },
        {
          title: "Commercial Cleaning",
          description:
            "Professional cleaning solutions for offices and business spaces",
          icon: <FaBuilding/>,
          imageUrl: commercialClean.src,
        },
        {
          title: "Deep Cleaning",
          description: "Intensive cleaning service addressing hard-to-reach areas",
          icon: <FaBroom/>,
          imageUrl: deepClean.src,
        },
        {
          title: "Move-in/Move-out Cleaning",
          description:
            "Specialized cleaning for property transitions and real estate",
          icon: <FaTruckMoving/>,
          imageUrl: moveClean.src,
        },
      ];
  return (
    <>
              {/* Hero Section */}
              <div className="relative h-[700px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"
                  style={{
                    backgroundImage: `url('/assets/images/cleaning-window.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Professional Cleaning Services
                    </h1>
                    <p className="text-xl mb-8">
                      Creating spotless environments for homes and businesses. Our
                      expert cleaning team delivers exceptional results every
                      time.
                    </p>
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
                    >
                      <Link href="/quotes">Book Cleaning Service</Link>
                    </Button>
                  </div>
                </div>
              </div>
              {/* Services */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Our Cleaning Services
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    We offer a comprehensive range of cleaning services to meet
                    your specific needs.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {cleaningServices.map((service, index) => (
                    <Card
                      key={index}
                      className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <i className={`$ text-blue-600 mr-2`}>{service.icon}</i>
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{service.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full !rounded-button whitespace-nowrap"
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              {/* Cleaning Packages */}
              <div className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                      Our Cleaning Packages
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Choose the perfect cleaning package to suit your needs and
                      budget.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                      {
                        title: "Standard Clean",
                        price: "$120",
                        description: "Perfect for regular maintenance cleaning",
                        features: [
                          "Dusting and vacuuming",
                          "Kitchen and bathroom cleaning",
                          "Floor mopping",
                          "Trash removal",
                          "Surface wiping",
                        ],
                      },
                      {
                        title: "Deep Clean",
                        price: "$220",
                        description:
                          "Thorough cleaning of all areas and surfaces",
                        features: [
                          "All Standard Clean services",
                          "Inside cabinet cleaning",
                          "Baseboard and vent cleaning",
                          "Window sill cleaning",
                          "Appliance cleaning",
                          "Light fixture dusting",
                        ],
                        highlighted: true,
                      },
                      {
                        title: "Move-In/Out Clean",
                        price: "$320",
                        description:
                          "Comprehensive cleaning for property transitions",
                        features: [
                          "All Deep Clean services",
                          "Inside oven and refrigerator",
                          "Inside window cleaning",
                          "Wall spot cleaning",
                          "Cabinet deep cleaning",
                          "Fixture descaling",
                        ],
                      },
                    ].map((pkg, index) => (
                      <Card
                        key={index}
                        className={`border-2 ${pkg.highlighted ? "border-blue-500 shadow-lg" : "border-blue-100"}`}
                      >
                        {pkg.highlighted && (
                          <div className="bg-blue-500 text-white text-center py-2">
                            <p className="font-medium">Most Popular</p>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-2xl text-center">
                            {pkg.title}
                          </CardTitle>
                          <div className="text-center">
                            <span className="text-3xl font-bold text-blue-600">
                              {pkg.price}
                            </span>
                            <span className="text-gray-500"> / visit</span>
                          </div>
                          <CardDescription className="text-center">
                            {pkg.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className={`w-full !rounded-button whitespace-nowrap ${pkg.highlighted ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                          >
                            <Link href="/quotes">Book Now</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              {/* Cleaning Process */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Our Cleaning Process
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    We follow a systematic approach to ensure thorough and
                    efficient cleaning.
                  </p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                  {[
                    {
                      title: "Book",
                      description:
                        "Schedule your cleaning service online or by phone",
                      icon: <FaCalendarCheck/>,
                    },
                    {
                      title: "Assess",
                      description:
                        "We assess your space and specific cleaning requirements",
                      icon: <FaClipboardList/>,
                    },
                    {
                      title: "Clean",
                      description:
                        "Our professional team performs thorough cleaning",
                      icon: <FaSprayCan/>,
                    },
                    {
                      title: "Inspect",
                      description:
                        "Final inspection to ensure everything meets our standards",
                      icon: <FaSearch/>,
                    },
                  ].map((step, index) => (
                    <Card
                      key={index}
                      className="border-2 border-blue-100 text-center"
                    >
                      <CardHeader>
                        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <i
                            className={` text-blue-600 text-2xl`}
                          >{step.icon}</i>
                        </div>
                        <CardTitle>{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {/* Cleaning Checklist */}
              <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                      Our Cleaning Checklist
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Here's what our standard cleaning service includes for each
                      area of your home or office.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <Card className="border-2 border-blue-100">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FaUtensils className="fas fa-utensils text-blue-600 mr-2"/>
                          Kitchen
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>
                              Clean and sanitize countertops and backsplash
                            </span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Clean exterior of appliances</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Clean and shine sink and fixtures</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Clean microwave interior and exterior</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Wipe cabinet doors and handles</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Sweep and mop floors</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-blue-100">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FaBath className="fas fa-bath text-blue-600 mr-2"/>
                          Bathroom
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>
                              Clean and sanitize toilet, tub, and shower
                            </span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Clean and shine sink and fixtures</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Clean mirrors and glass surfaces</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Wipe cabinet doors and handles</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Empty trash and replace liners</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Sweep and mop floors</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-blue-100">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FaCouch className="fas fa-couch text-blue-600 mr-2"/>
                          Living Areas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Dust all accessible surfaces</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Wipe down tables and visible surfaces</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Vacuum carpets and rugs</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Sweep and mop hard floors</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Empty trash and replace liners</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Clean door handles and light switches</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-blue-100">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FaBed className="fas fa-bed text-blue-600 mr-2"/>
                          Bedrooms
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Dust all accessible surfaces</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Wipe down nightstands and dressers</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Change linens (upon request)</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Vacuum carpets and rugs</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Sweep and mop hard floors</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                            <span>Empty trash and replace liners</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              {/* Booking Calendar */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Book Your Cleaning Service
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Select your preferred date and time for your cleaning service.
                  </p>
                </div>
                <div className="max-w-3xl mx-auto">
                  <Card className="border-2 border-blue-100">
                    <CardHeader>
                      <CardTitle>Select Date and Time</CardTitle>
                      <CardDescription>
                        Choose your preferred cleaning schedule
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="mb-2 block">Select Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal !rounded whitespace-nowrap",
                                  !selectedDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 bg-white" />
                                {selectedDate
                                  ? format(selectedDate, "PPP")
                                  : "Select a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <label className="mb-2 block">Select Time</label>
                          <Select defaultValue="morning">
                            <SelectTrigger className="!rounded-button">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">
                                Morning (8:00 AM - 12:00 PM)
                              </SelectItem>
                              <SelectItem value="afternoon">
                                Afternoon (12:00 PM - 4:00 PM)
                              </SelectItem>
                              <SelectItem value="evening">
                                Evening (4:00 PM - 8:00 PM)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-8">
                        <label className="mb-2 block">Service Type</label>
                        <Select defaultValue="standard">
                          <SelectTrigger className="!rounded-button">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">
                              Standard Clean
                            </SelectItem>
                            <SelectItem value="deep">Deep Clean</SelectItem>
                            <SelectItem value="move">
                              Move-In/Out Clean
                            </SelectItem>
                            <SelectItem value="office">Office Clean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-8">
                        <label className="mb-2 block">Special Instructions</label>
                        <Textarea
                          placeholder="Any specific areas to focus on or special instructions for our cleaning team"
                          className="!rounded-button"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full !rounded-button whitespace-nowrap">
                        Book Cleaning Service
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
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