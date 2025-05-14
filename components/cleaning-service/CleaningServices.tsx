'use client'

import React from 'react'
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { FaHome, FaBuilding, FaBroom, FaTruckMoving } from 'react-icons/fa';
import deepClean from "@/public/assets/images/deep-cleaning.jpg"
import commercialClean from "@/public/assets/images/cleaning-office.jpg"
import homeClean from "@/public/assets/images/cleaning.jpg"
import moveClean from "@/public/assets/images/post-construction.jpg"

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
  const { data, error, isLoading } = useSWR<{ services: Service[] }>('/api/cleaning/services', fetcher);
  const cleaningServices = data?.services ?? [];
    // const cleaningServices = [
    //     {
    //       title: "Residential Cleaning",
    //       description:
    //         "Comprehensive home cleaning services tailored to your needs",
    //       icon: <FaHome/>,
    //       imageUrl:homeClean.src,
    //     },
    //     {
    //       title: "Commercial Cleaning",
    //       description:
    //         "Professional cleaning solutions for offices and business spaces",
    //       icon: <FaBuilding/>,
    //       imageUrl: commercialClean.src,
    //     },
    //     {
    //       title: "Deep Cleaning",
    //       description: "Intensive cleaning service addressing hard-to-reach areas",
    //       icon: <FaBroom/>,
    //       imageUrl: deepClean.src,
    //     },
    //     {
    //       title: "Move-in/Move-out Cleaning",
    //       description:
    //         "Specialized cleaning for property transitions and real estate",
    //       icon: <FaTruckMoving/>,
    //       imageUrl: moveClean.src,
    //     },
    //   ];
      
    return (
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
                        src={service.imageUrl?.secure_url}
                        alt={service.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                    </div>
                    <CardHeader>
                    <CardTitle className="flex items-center">
                        <i className={`$ text-blue-600 mr-2`}>{service.iconName}</i>
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
    )
}

export default CleaningServices;