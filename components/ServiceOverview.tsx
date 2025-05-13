// app/components/ServiceOverview.tsx
'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { FaCheck, } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';

const ServiceOverview = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/home/services')
      .then(res => res.json())
      .then(setServices);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our comprehensive range of professional services.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {services.map((service: any) => {
          const Icon = Icons[service.icon as keyof typeof Icons] || FaCheck;
          return (
            <Card key={service._id}>
              <div className="h-48 overflow-hidden">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {/* <Icon className="text-blue-600 mr-2" /> */}
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((f: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded whitespace-nowrap">
                  <Link href={`/${service.slug}`}>Explore {service.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceOverview;
