"use client";
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import Link from "next/link";
import ContactHero from "@/components/contact-us/contactHero";
import ContactInfo from "@/components/contact-us/ContactInfo";
import BusinessHourMap from "@/components/contact-us/BusinessHourMap";
import ContactForm from "@/components/contact-us/ContactForm";
import ContactFaq from "@/components/contact-us/ContactFaq";
import SocialNewsletter from "@/components/contact-us/SocialNewsletter";

const page = () => {
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
        <ContactHero />
        {/* Contact Information Section */}
        <ContactInfo />
        {/* Business Hours and Map Section */}
        <BusinessHourMap />
        {/* Contact Form Section */}
        <ContactForm />
        {/* FAQ Section */}
        <ContactFaq />
        {/* Social Media and Newsletter */}
        <SocialNewsletter />

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
                  {/* Use styled Link instead of nested Button/Link */}
                  <Link
                    href="/quotes"
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium transition rounded-button whitespace-nowrap
                               px-6 py-3
                               bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Request a Quote
                  </Link>

                  <Link
                    href="https://readdy.ai/home/61db536b-a10e-43f4-b3d4-43003c996852/c465414b-aaa6-4df1-a6fc-1661b8d502d5"
                    data-readdy="true"
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium transition rounded-button whitespace-nowrap
                               px-6 py-3
                               bg-transparent border border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Back to Home
                  </Link>
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
