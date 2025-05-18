'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'translation', label: 'Translation Services' },
  { value: 'cleaning', label: 'Cleaning Services' },
  { value: 'quote', label: 'Request a Quote' },
  { value: 'support', label: 'Customer Support' },
  { value: 'feedback', label: 'Feedback' },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please provide consent before submitting.');
      return;
    }

    const res = await fetch('/api/send-contact-email', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Your message has been sent!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        consent: false,
      });
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and one of our representatives will get
              back to you as soon as possible.
            </p>
          </div>
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>
                Please provide your information and message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={handleSubjectChange}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry"
                    className="min-h-[150px] rounded-lg"
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm text-gray-600">
                    I consent to ORPAMAX Services collecting and storing my
                    data from this form. For more details, please see our{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>.
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full rounded-lg whitespace-nowrap">
                <FaPaperPlane className="mr-2" /> Send Message
              </Button>
              <p className="text-xs text-gray-500 text-center">
                We typically respond to all inquiries within 24 business hours.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
