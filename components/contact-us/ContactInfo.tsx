'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaMapMarker, FaDirections, FaPhoneAlt, FaHeadset, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

const ICONS: Record<string, any> = {
  visit: <FaMapMarker className="text-blue-600 text-2xl" />,
  call: <FaPhoneAlt className="text-blue-600 text-2xl" />,
  email: <FaEnvelope className="text-blue-600 text-2xl" />,
};

const BUTTONS: Record<string, any> = {
  visit: { icon: <FaDirections className="mr-2" />, text: 'Get Directions' },
  call: { icon: <FaHeadset className="mr-2" />, text: 'Request Callback' },
  email: { icon: <FaPaperPlane className="mr-2" />, text: 'Send Email' },
};

const ContactInfo = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/contact-us/contact-info')
      .then(res => res.json())
      .then(setSections);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sections.map((section: any) => (
          <Card key={section._id} className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                {ICONS[section.type]}
              </div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {section.lines.map((line: string, i: number) => (
                <p className="text-gray-700 mb-2" key={i}>{line}</p>
              ))}
              <Button variant="outline" className="!rounded-button whitespace-nowrap">
                {BUTTONS[section.type]?.icon} {BUTTONS[section.type]?.text}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
