'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaClock, FaMapMarker, FaDirections } from 'react-icons/fa';
import axios from 'axios';

const BusinessInfoPage = () => {
  const [businessInfo, setBusinessInfo] = useState<any>(null);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const response = await axios.get('/api/admin/contact/business-info');
      setBusinessInfo(response.data);
    };
    fetchBusinessInfo();
  }, []);

  if (!businessInfo) return <p>Loading...</p>;

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Business Hours */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Business Hours</h2>
            <Card className="border-2 border-blue-100">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <FaClock className="text-blue-600 mr-3" />
                      <span className="font-medium">Monday - Friday</span>
                    </div>
                    <span>{businessInfo.hours.mondayToFriday}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <FaClock className="text-blue-600 mr-3" />
                      <span className="font-medium">Saturday</span>
                    </div>
                    <span>{businessInfo.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <FaClock className="text-blue-600 mr-3" />
                      <span className="font-medium">Sunday</span>
                    </div>
                    <span>{businessInfo.hours.sunday}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Holiday Hours</h3>
                  <p className="text-gray-600">{businessInfo.hours.holidayHours}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Emergency Services</h3>
                  <p className="text-gray-600">{businessInfo.hours.emergencyServices || 'Not available'}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Location */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Find Us</h2>
            <Card className="border-2 border-blue-100 overflow-hidden">
              <div className="h-[300px] bg-gray-200 relative">
                <img
                  src={businessInfo.location.mapImage}
                  alt="Office Location Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-3 rounded-lg shadow-lg">
                    <FaMapMarker className="text-red-500 text-2xl" />
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{businessInfo.location.address}</p>
                  </div>
                  <Button size="sm" className="!rounded-button whitespace-nowrap">
                    <FaDirections className="mr-2" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoPage;
