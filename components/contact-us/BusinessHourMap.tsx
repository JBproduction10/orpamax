import React from 'react'
import { Button } from '@/components/ui/button';
import { FaClock, FaMapMarker, FaDirections } from 'react-icons/fa';
import { Card, CardContent } from '../ui/card';

const BusinessHourMap = () => {
    return (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold mb-6">Business Hours</h2>
                <Card className="border-2 border-blue-100">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <FaClock className="fas fa-clock text-blue-600 mr-3"/>
                          <span className="font-medium">Monday - Friday</span>
                        </div>
                        <span>8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <FaClock className="fas fa-clock text-blue-600 mr-3"/>
                          <span className="font-medium">Saturday</span>
                        </div>
                        <span>9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <FaClock className="fas fa-clock text-blue-600 mr-3"/>
                          <span className="font-medium">Sunday</span>
                        </div>
                        <span>Closed</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">
                        Holiday Hours
                      </h3>
                      <p className="text-gray-600">
                        We are closed on major holidays. For the current holiday
                        schedule, please contact our office.
                      </p>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">
                        Emergency Services
                      </h3>
                      <p className="text-gray-600">
                        For urgent cleaning needs outside regular business
                        hours, please call our emergency line at (123) 456-7899.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Find Us</h2>
                <Card className="border-2 border-blue-100 overflow-hidden">
                  <div className="h-[300px] bg-gray-200 relative">
                    <img
                      src="https://readdy.ai/api/search-image?query=Detailed%20map%20of%20New%20York%20City%20Manhattan%20area%20showing%20streets%20and%20landmarks%20with%20a%20blue%20pin%20marker%20indicating%20an%20office%20location%20near%20Times%20Square%2C%20realistic%20satellite%20view%20style%20map%20with%20clear%20street%20names%20and%20building%20outlines&width=600&height=300&seq=21&orientation=landscape"
                      alt="Office Location Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white p-3 rounded-lg shadow-lg">
                        <FaMapMarker className="fas fa-map-marker-alt text-red-500 text-2xl"/>
                      </div>
                    </div>
                  </div>
                  <CardContent className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">ORPAMAX HQ</p>
                        <p className="text-sm text-gray-500">
                          Portland, Maine
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <FaDirections className="fas fa-directions mr-2"/> Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
    )
}

export default BusinessHourMap;