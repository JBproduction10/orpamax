import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import { FaBroom, FaCheck, FaLanguage } from 'react-icons/fa'

const ServiceOverview = () => {
  return (
    <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Our Premium Services
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Choose from our comprehensive range of professional services
                    designed to meet your language and cleaning needs.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Professional%20translation%20service%20concept%20with%20multilingual%20documents%2C%20dictionaries%2C%20and%20computer%20screens%20showing%20different%20languages%2C%20clean%20modern%20office%20setting%20with%20blue%20accents%2C%20organized%20workspace%20with%20translation%20materials&width=600&height=300&seq=10&orientation=landscape"
                        alt="Translation Services"
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FaLanguage className="fas fa-language text-blue-600 mr-2"/>
                        Translation Services
                      </CardTitle>
                      <CardDescription>
                        Professional language solutions for all your needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                          <span>Document, technical, and legal translations</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                          <span>Website localization and content adaptation</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                          <span>
                            Certified translations for official documents
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full rounded whitespace-nowrap"
                      >
                        <Link href='/translation-services'>Explore Translation Services</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Professional%20cleaning%20service%20concept%20with%20spotless%20modern%20office%20and%20home%20environments%2C%20cleaning%20equipment%20and%20supplies%2C%20bright%20clean%20spaces%20with%20blue%20accents%2C%20organized%20cleaning%20materials%2C%20professional%20cleaners%20in%20uniform&width=600&height=300&seq=11&orientation=landscape"
                        alt="Cleaning Services"
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FaBroom className="fas fa-broom text-blue-600 mr-2"/>
                        Cleaning Services
                      </CardTitle>
                      <CardDescription>
                        Expert cleaning solutions for homes and businesses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                          <span>Residential and commercial cleaning</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                          <span>Deep cleaning and specialized services</span>
                        </li>
                        <li className="flex items-start">
                          <FaCheck className="fas fa-check text-green-500 mt-1 mr-2"/>
                          <span>
                            Move-in/move-out and post-construction cleaning
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className='w-full rounded whitespace-nowrap'
                      >
                        <Link href="/cleaning-services">Explore Cleaning Services</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
  )
}

export default ServiceOverview