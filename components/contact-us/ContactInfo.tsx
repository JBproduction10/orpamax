import React from 'react'
import { Button } from '@/components/ui/button';
import { FaMapMarker, FaDirections, FaPhoneAlt, FaHeadset, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

const ContactInfo = () => {
    return (
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FaMapMarker className="fas fa-map-marker-alt text-blue-600 text-2xl"/>
                </div>
                <CardTitle>Visit Us</CardTitle>
                <CardDescription>Our office location</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 mb-2">
                  Portland, Maine
                </p>
                <p className="text-gray-700 mb-4">Portland, Maine</p>
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FaDirections className="fas fa-directions mr-2"/> Get Directions
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FaPhoneAlt className="fas fa-phone-alt text-blue-600 text-2xl"/>
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Our phone numbers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 mb-2">Main: (123) 456-7890</p>
                <p className="text-gray-700 mb-2">Support: (123) 456-7891</p>
                <p className="text-gray-700 mb-4">Toll-free: 1-800-123-4567</p>
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FaHeadset className="fas fa-headset mr-2"/> Request Callback
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FaEnvelope className="fas fa-envelope text-blue-600 text-2xl"/>
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>Our email addresses</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 mb-2">
                  General: info@orpamax.com
                </p>
                <p className="text-gray-700 mb-2">
                  Support: support@orpamax.com
                </p>
                <p className="text-gray-700 mb-4">
                  Careers: careers@orpamax.com
                </p>
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
                >
                  <FaPaperPlane className="fas fa-paper-plane mr-2"/> Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
    )
}

export default ContactInfo;