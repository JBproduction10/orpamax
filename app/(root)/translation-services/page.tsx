"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { Badge } from '@/components/ui/badge'
import { Pagination, Autoplay } from "swiper/modules";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import inPersonTranslation from "@/public/assets/images/talking.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from 'next/link'
import { testimonials } from '@/data'
import { FaBalanceScale, FaCheckDouble, FaCogs, FaFileAlt, FaFileUpload, FaHandshake, FaLanguage, FaSearch } from 'react-icons/fa'

const page = () => {
    const [languageFrom, setLanguageFrom] = useState("english");
    const swiperModules = [Pagination, Autoplay];
     const [languageTo, setLanguageTo] = useState("spanish");
     
    const translationServices = [
        {
          title: "Document Translation",
          description:
            "Professional translation of all document types with certified accuracy",
          icon: <FaFileAlt/>,
          imageUrl:
            "https://readdy.ai/api/search-image?query=Professional%20document%20translation%20service%20concept%20with%20papers%2C%20dictionaries%2C%20and%20computer%20with%20multiple%20language%20text%20visible%2C%20clean%20modern%20office%20setting%2C%20soft%20natural%20lighting%2C%20minimalist%20desk%20arrangement&width=400&height=300&seq=1&orientation=landscape",
        },
        {
          title: "Technical Translation",
          description:
            "Specialized translation for technical manuals, guides, and specifications",
          icon: <FaCogs/>,
          imageUrl:
            "https://readdy.ai/api/search-image?query=Technical%20translation%20workspace%20with%20engineering%20documents%2C%20technical%20manuals%2C%20and%20computer%20screens%20showing%20diagrams%20and%20multilingual%20technical%20content%2C%20modern%20office%20environment%2C%20professional%20setting%2C%20clean%20desk&width=400&height=300&seq=2&orientation=landscape",
        },
        {
          title: "Legal Translation",
          description:
            "Precise translation of legal documents with terminology expertise",
          icon: <FaBalanceScale/>,
          imageUrl:
            "https://readdy.ai/api/search-image?query=Legal%20translation%20workspace%20with%20law%20books%2C%20legal%20documents%2C%20scales%20of%20justice%2C%20and%20computer%20showing%20multilingual%20legal%20text%2C%20professional%20office%20setting%2C%20organized%20desk%20with%20legal%20papers%2C%20clean%20modern%20environment&width=400&height=300&seq=3&orientation=landscape",
        },
        {
          title: "In Person Translation",
          description:
            "One of our professional translators will be physically present to facilitate communication between parties who speak different languages. This will accurately interpret business meetings, legal proceedings, medical appointments, and conferences.",
          icon: <FaHandshake/>,
          imageUrl:inPersonTranslation.src,
        },
      ];
  return (
    <>
              {/* Hero Section */}
              <div className="relative h-[700px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"
                  style={{
                    backgroundImage: `url('/assets/flags.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Professional Translation Services
                    </h1>
                    <p className="text-xl mb-8">
                      Breaking language barriers with precision and cultural
                      sensitivity. Our expert translators deliver accurate
                      translations across multiple industries.
                    </p>
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
                    >
                      <Link href="/quotes">Get a Translation Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
              {/* Services */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Our Translation Services
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    We offer a comprehensive range of translation services to meet
                    your specific needs.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {translationServices.map((service, index) => (
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
                          <i className={`text-blue-600 mr-2`}>{service.icon}</i>
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
              {/* Languages */}
              <div className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                      Languages We Support
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Our team of professional translators covers a wide range of
                      languages to meet your global communication needs.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                    {[
                      "English",
                      "Spanish",
                      "French",
                      "Lingala",
                      "Swahili",
                    ].map((language, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center"
                      >
                        <span className="font-medium text-gray-700">
                          {language}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Translation Process */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Our Translation Process
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    We follow a rigorous process to ensure the highest quality
                    translations.
                  </p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                  {[
                    {
                      title: "Request",
                      description:
                        "Submit your documents and requirements through our easy quote form",
                      icon: <FaFileUpload/>,
                    },
                    {
                      title: "Analysis",
                      description:
                        "Our team analyzes your content and assigns the most suitable translator",
                      icon: <FaSearch/>,
                    },
                    {
                      title: "Translation",
                      description:
                        "Professional translation with attention to context and terminology",
                      icon: <FaLanguage/>,
                    },
                    {
                      title: "Quality Check",
                      description:
                        "Thorough review and quality assurance before final delivery",
                      icon: <FaCheckDouble/>,
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
              {/* Translation Calculator */}
              <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto">
                    <Card className="border-2 border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-2xl text-center">
                          Translation Price Calculator
                        </CardTitle>
                        <CardDescription className="text-center">
                          Get an instant estimate for your translation project
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="languageFrom">From Language</label>
                              <Select
                                value={languageFrom}
                                onValueChange={setLanguageFrom}
                              >
                                <SelectTrigger className="!rounded-button">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="english">English</SelectItem>
                                  <SelectItem value="spanish">Spanish</SelectItem>
                                  <SelectItem value="french">French</SelectItem>
                                  <SelectItem value="german">German</SelectItem>
                                  <SelectItem value="chinese">Chinese</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="languageTo">To Language</label>
                              <Select
                                value={languageTo}
                                onValueChange={setLanguageTo}
                              >
                                <SelectTrigger className="!rounded-button">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="english">English</SelectItem>
                                  <SelectItem value="spanish">Spanish</SelectItem>
                                  <SelectItem value="french">French</SelectItem>
                                  <SelectItem value="german">German</SelectItem>
                                  <SelectItem value="chinese">Chinese</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="documentType">Document Type</label>
                            <Select defaultValue="general">
                              <SelectTrigger className="!rounded-button">
                                <SelectValue placeholder="Select document type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">
                                  General Document
                                </SelectItem>
                                <SelectItem value="technical">
                                  Technical Document
                                </SelectItem>
                                <SelectItem value="legal">
                                  Legal Document
                                </SelectItem>
                                <SelectItem value="medical">
                                  Medical Document
                                </SelectItem>
                                <SelectItem value="website">
                                  Website Content
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="wordCount">
                              Word Count (Approximate)
                            </label>
                            <Input
                              type="number"
                              id="wordCount"
                              placeholder="Enter number of words"
                              className="!rounded-button"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="urgency">Delivery Time</label>
                            <Select defaultValue="standard">
                              <SelectTrigger className="!rounded-button">
                                <SelectValue placeholder="Select urgency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">
                                  Standard (3-5 business days)
                                </SelectItem>
                                <SelectItem value="express">
                                  Express (1-2 business days)
                                </SelectItem>
                                <SelectItem value="urgent">
                                  Urgent (24 hours)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full !rounded-button whitespace-nowrap">
                          Calculate Price
                        </Button>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">
                            For more accurate quotes, please use our detailed
                            quote request form
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
              {/* Testimonials */}
              <div className="container mx-auto px-4 py-16">
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
              </div>
              {/* FAQ */}
              <div className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Find answers to common questions about our translation
                      services.
                    </p>
                  </div>
                  <div className="max-w-3xl mx-auto">
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger
                          value="general"
                          className="!rounded-button whitespace-nowrap"
                        >
                          General
                        </TabsTrigger>
                        <TabsTrigger
                          value="process"
                          className="!rounded-button whitespace-nowrap"
                        >
                          Process
                        </TabsTrigger>
                        <TabsTrigger
                          value="pricing"
                          className="!rounded-button whitespace-nowrap"
                        >
                          Pricing
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="general">
                        <div className="space-y-4">
                          {[
                            {
                              question: "What languages do you translate?",
                              answer:
                                "We offer translation services for over 50 languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and many more. If you need a specific language pair, please contact us to confirm availability.",
                            },
                            {
                              question: "Are your translators certified?",
                              answer:
                                "Yes, our translation team consists of certified professional translators with expertise in various fields. For official documents requiring certified translations, we provide certification and notarization services as needed.",
                            },
                            {
                              question: "How do you ensure translation quality?",
                              answer:
                                "We follow a rigorous quality assurance process that includes translation by a native speaker, editing by a second linguist, and final proofreading before delivery. We also use specialized terminology management systems to ensure consistency.",
                            },
                          ].map((faq, index) => (
                            <Card
                              key={index}
                              className="border-2 border-blue-100"
                            >
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <i className="fas fa-question-circle text-blue-600 mr-2"></i>
                                  {faq.question}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-600">{faq.answer}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="process">
                        <div className="space-y-4">
                          {[
                            {
                              question:
                                "How do I submit documents for translation?",
                              answer:
                                "You can submit your documents through our secure online portal, via email, or by using our quote request form. We accept most file formats including Word, PDF, Excel, PowerPoint, and InDesign files.",
                            },
                            {
                              question: "What is your typical turnaround time?",
                              answer:
                                "Turnaround time depends on the document length, complexity, and language pair. Standard delivery is typically 3-5 business days, while express and urgent options are available for faster delivery at additional cost.",
                            },
                            {
                              question: "Do you offer revisions after delivery?",
                              answer:
                                "Yes, we offer one round of revisions free of charge within 7 days of delivery. Additional revision requests may incur extra fees depending on the extent of changes requested.",
                            },
                          ].map((faq, index) => (
                            <Card
                              key={index}
                              className="border-2 border-blue-100"
                            >
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <i className="fas fa-question-circle text-blue-600 mr-2"></i>
                                  {faq.question}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-600">{faq.answer}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="pricing">
                        <div className="space-y-4">
                          {[
                            {
                              question: "How do you calculate translation costs?",
                              answer:
                                "Our pricing is typically based on word count, language pair, subject matter complexity, and delivery timeline. Technical, legal, and medical translations may have higher rates due to specialized terminology requirements.",
                            },
                            {
                              question: "Do you offer volume discounts?",
                              answer:
                                "Yes, we offer discounted rates for large projects and ongoing translation needs. We can also create customized pricing packages for clients with regular translation requirements.",
                            },
                            {
                              question: "What payment methods do you accept?",
                              answer:
                                "We accept credit cards, PayPal, bank transfers, and corporate purchase orders. For large projects, we typically require a deposit before beginning work, with the balance due upon completion.",
                            },
                          ].map((faq, index) => (
                            <Card
                              key={index}
                              className="border-2 border-blue-100"
                            >
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center">
                                  <i className="fas fa-question-circle text-blue-600 mr-2"></i>
                                  {faq.question}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-600">{faq.answer}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
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