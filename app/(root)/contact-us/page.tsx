"use client"
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaDirections, FaEnvelope, FaFacebook, FaHeadset, FaInstagram, FaLinkedin, FaMapMarker, FaPaperPlane, FaPhone, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
const page= () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const faqItems = [
    {
      question: "What areas do you service?",
      answer:
        "We currently provide our cleaning and translation services in New York City and surrounding areas including Brooklyn, Queens, Bronx, Staten Island, and parts of New Jersey and Connecticut. For translation services, we can work with clients worldwide through our online platform.",
    },
    {
      question: "How do I schedule a cleaning service?",
      answer:
        "You can schedule a cleaning service by filling out our contact form, calling our customer service line at (123) 456-7890, or using our online booking system. We recommend booking at least 48 hours in advance to ensure availability.",
    },
    {
      question: "What languages do you translate?",
      answer:
        "Our professional translators cover over 50 languages including Spanish, French, German, Chinese, Japanese, Arabic, Russian, Portuguese, Italian, Korean, and many more. If you need a specific language pair, please contact us to confirm availability.",
    },
    {
      question: "Do you provide certified translations?",
      answer:
        "Yes, we offer certified translation services for official documents such as birth certificates, marriage certificates, academic transcripts, and legal documents. Our certified translations are accepted by USCIS, educational institutions, and courts.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "For cleaning services, we require at least 24 hours notice for cancellations. Late cancellations (less than 24 hours) may incur a fee of 50% of the service cost. For translation projects, cancellation terms depend on the project size and completion status.",
    },
    {
      question: "Do you bring your own cleaning supplies?",
      answer:
        "Yes, our professional cleaning teams bring all necessary cleaning supplies and equipment. We use eco-friendly products as our standard offering. If you have specific product preferences or sensitivities, please let us know in advance.",
    },
  ];
  return (
    <div className="bg-white">
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <div className="relative h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/70"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20contact%20center%20with%20modern%20office%20environment%20featuring%20blue%20color%20scheme%2C%20customer%20service%20representatives%20at%20workstations%20with%20headsets%2C%20large%20windows%20with%20city%20view%2C%20plants%20and%20comfortable%20seating%20area%20for%20visitors%2C%20clean%20organized%20reception%20desk%20with%20company%20logo%20displayed%20prominently&width=1440&height=400&seq=20&orientation=landscape')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-2xl text-black">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl mb-8">
                We're here to help with all your translation and cleaning needs.
                Reach out to our team for personalized service and support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 !rounded-button whitespace-nowrap"
                >
                  <FaPhone className="fas fa-phone-alt mr-2"/>Call Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-gray-200 border-white text-blue-500 hover:bg-white/10 !rounded-button whitespace-nowrap"
                >
                  <FaEnvelope className="fas fa-envelope mr-2"/> Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Information Section */}
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
                  General: info@cleanspeak.com
                </p>
                <p className="text-gray-700 mb-2">
                  Support: support@cleanspeak.com
                </p>
                <p className="text-gray-700 mb-4">
                  Careers: careers@cleanspeak.com
                </p>
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-paper-plane mr-2"></i> Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Business Hours and Map Section */}
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
                          <i className="fas fa-clock text-blue-600 mr-3"></i>
                          <span className="font-medium">Monday - Friday</span>
                        </div>
                        <span>8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <i className="fas fa-clock text-blue-600 mr-3"></i>
                          <span className="font-medium">Saturday</span>
                        </div>
                        <span>9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <i className="fas fa-clock text-blue-600 mr-3"></i>
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
        {/* Contact Form Section */}
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
                        placeholder="Enter your first name"
                        className="!rounded-button"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="!rounded-button"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="!rounded-button"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="!rounded-button"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select defaultValue="general">
                      <SelectTrigger className="!rounded-button">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="translation">
                          Translation Services
                        </SelectItem>
                        <SelectItem value="cleaning">
                          Cleaning Services
                        </SelectItem>
                        <SelectItem value="quote">Request a Quote</SelectItem>
                        <SelectItem value="support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry"
                      className="min-h-[150px] !rounded-button"
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="consent" className="mt-1" />
                    <Label htmlFor="consent" className="text-sm text-gray-600">
                      I consent to CleanSpeak Services collecting and storing my
                      data from this form. For more details, please see our{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full !rounded-button whitespace-nowrap">
                  <FaPaperPlane className="fas fa-paper-plane mr-2"/> Send Message
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  We typically respond to all inquiries within 24 business
                  hours.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
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
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our services.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-blue-100"
                >
                  <AccordionTrigger className="text-left font-medium hover:text-blue-600 py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Don't see your question here?
              </p>
              <Button className="!rounded-button whitespace-nowrap">
                <i className="fas fa-question-circle mr-2"></i> Ask a Question
              </Button>
            </div>
          </div>
        </div>
        {/* Social Media and Newsletter */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                  <p className="text-gray-600 mb-6">
                    Follow us on social media for updates, tips, and special
                    offers.
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    <a href="#" className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2 hover:bg-blue-700 transition-colors cursor-pointer">
                        <FaFacebook className="fab fa-facebook-f text-white"/>
                      </div>
                      <span className="text-sm">Facebook</span>
                    </a>
                    {/* <a href="#" className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mb-2 hover:bg-blue-500 transition-colors cursor-pointer">
                        <i className="fab fa-twitter text-white"></i>
                      </div>
                      <span className="text-sm">Twitter</span>
                    </a> */}
                    <a href="#" className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center mb-2 hover:bg-pink-700 transition-colors cursor-pointer">
                        <FaInstagram className="fab fa-instagram text-white"/>
                      </div>
                      <span className="text-sm">Instagram</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mb-2 hover:bg-blue-900 transition-colors cursor-pointer">
                        <FaLinkedin className="fab fa-linkedin-in text-white"/>
                      </div>
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Stay updated with our latest services, promotions, and
                    cleaning/translation tips.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder="Enter your email address"
                      className="!rounded-button"
                    />
                    <Button className="whitespace-nowrap !rounded-button">
                      <FaEnvelope className="fas fa-envelope mr-2"/> Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    By subscribing, you agree to receive marketing emails from
                    CleanSpeak Services. You can unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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