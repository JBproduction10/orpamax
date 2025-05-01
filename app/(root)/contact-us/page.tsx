"use client"
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactHero from "@/components/contact-us/contactHero";
import ContactInfo from "@/components/contact-us/ContactInfo";
import BusinessHourMap from "@/components/contact-us/BusinessHourMap";
import ContactForm from "@/components/contact-us/ContactForm";
import ContactFaq from "@/components/contact-us/ContactFaq";
import SocialNewsletter from "@/components/contact-us/SocialNewsletter";


const page= () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  
  return (
    <div className="bg-white">
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <ContactHero/>
        {/* Contact Information Section */}
        <ContactInfo/> 
        {/* Business Hours and Map Section */}
        <BusinessHourMap/>
        {/* Contact Form Section */}
        <ContactForm/>
        {/* Live Chat and Support Options */}
        {/* <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Additional Contact Options
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the contact method that works best for you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fas fa-comments text-blue-600 text-2xl"></i>
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">
                    Chat with our customer service team in real-time for
                    immediate assistance.
                  </p>
                  <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                    Available Now
                  </Badge>
                  <Button className="w-full !rounded-button whitespace-nowrap">
                    <i className="fas fa-comment-dots mr-2"></i> Start Chat
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fas fa-ticket-alt text-blue-600 text-2xl"></i>
                  </div>
                  <CardTitle>Support Ticket</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">
                    Submit a support ticket for technical issues or complex
                    inquiries.
                  </p>
                  <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    24/7 Support
                  </Badge>
                  <Button className="w-full !rounded-button whitespace-nowrap">
                    <i className="fas fa-plus-circle mr-2"></i> Create Ticket
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fas fa-calendar-check text-blue-600 text-2xl"></i>
                  </div>
                  <CardTitle>Schedule a Call</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">
                    Book a phone consultation with one of our service
                    specialists.
                  </p>
                  <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    By Appointment
                  </Badge>
                  <Button className="w-full !rounded-button whitespace-nowrap">
                    <i className="fas fa-phone mr-2"></i> Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div> */}
        {/* FAQ Section */}
        <ContactFaq/>
        {/* Social Media and Newsletter */}
        <SocialNewsletter/>
        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto bg-blue-600 rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-blue-100 mb-6">
                  Contact us today to discuss your translation or cleaning
                  needs. Our team is ready to provide you with excellent
                  service.
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
                    href="https://readdy.ai/home/61db536b-a10e-43f4-b3d4-43003c996852/c465414b-aaa6-4df1-a6fc-1661b8d502d5"
                    data-readdy="true"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white/10 !rounded-button whitespace-nowrap w-full"
                    >
                      <Link href="/">Back to Home</Link>
                    </Button>
                  </a>
                </div>
              </div>
              <div className="hidden md:block relative overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20customer%20service%20representative%20with%20headset%20smiling%20while%20talking%20to%20client%2C%20modern%20clean%20office%20environment%20with%20blue%20color%20scheme%2C%20computer%20screens%20visible%20showing%20customer%20information%2C%20friendly%20professional%20appearance%2C%20bright%20well-lit%20workspace&width=600&height=500&seq=22&orientation=portrait"
                  alt="Customer Service"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default page;