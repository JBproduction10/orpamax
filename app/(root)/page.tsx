"use client"
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import ServiceOverview from "@/components/ServiceOverview";
import QuickQuote from "@/components/QuickQuote";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import WhyUs from "@/components/WhyUs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("home");
  const [serviceType, setServiceType] = useState("translation");
  const [languageFrom, setLanguageFrom] = useState("english");
  const [languageTo, setLanguageTo] = useState("spanish");
  const swiperModules = [Pagination, Autoplay];
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.scrollTo(0, 0);
  };
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Global Tech Solutions",
      text: "The translation services provided were exceptional. Our technical documentation was translated with perfect accuracy and delivered ahead of schedule.",
      service: "translation",
    },
    {
      name: "Michael Chen",
      company: "Legal Partners LLP",
      text: "We've been using their legal translation services for over 3 years now. Their attention to detail and understanding of legal terminology is outstanding.",
      service: "translation",
    },
    {
      name: "David Williams",
      company: "Sunshine Properties",
      text: "Their cleaning team transformed our office space. Professional, thorough, and reliable. We've now signed up for weekly maintenance.",
      service: "cleaning",
    },
    {
      name: "Emily Rodriguez",
      company: "Creative Studios",
      text: "The deep cleaning service exceeded our expectations. Our studio space has never looked better. Highly recommend their eco-friendly options!",
      service: "cleaning",
    },
  ];
  const translationServices = [
    {
      title: "Document Translation",
      description:
        "Professional translation of all document types with certified accuracy",
      icon: "fas fa-file-alt",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Professional%20document%20translation%20service%20concept%20with%20papers%2C%20dictionaries%2C%20and%20computer%20with%20multiple%20language%20text%20visible%2C%20clean%20modern%20office%20setting%2C%20soft%20natural%20lighting%2C%20minimalist%20desk%20arrangement&width=400&height=300&seq=1&orientation=landscape",
    },
    {
      title: "Technical Translation",
      description:
        "Specialized translation for technical manuals, guides, and specifications",
      icon: "fas fa-cogs",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Technical%20translation%20workspace%20with%20engineering%20documents%2C%20technical%20manuals%2C%20and%20computer%20screens%20showing%20diagrams%20and%20multilingual%20technical%20content%2C%20modern%20office%20environment%2C%20professional%20setting%2C%20clean%20desk&width=400&height=300&seq=2&orientation=landscape",
    },
    {
      title: "Legal Translation",
      description:
        "Precise translation of legal documents with terminology expertise",
      icon: "fas fa-balance-scale",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Legal%20translation%20workspace%20with%20law%20books%2C%20legal%20documents%2C%20scales%20of%20justice%2C%20and%20computer%20showing%20multilingual%20legal%20text%2C%20professional%20office%20setting%2C%20organized%20desk%20with%20legal%20papers%2C%20clean%20modern%20environment&width=400&height=300&seq=3&orientation=landscape",
    },
  ];
  const cleaningServices = [
    {
      title: "Residential Cleaning",
      description:
        "Comprehensive home cleaning services tailored to your needs",
      icon: "fas fa-home",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Professional%20residential%20cleaning%20service%20with%20spotless%20living%20room%2C%20vacuum%20cleaner%2C%20cleaning%20supplies%2C%20bright%20natural%20lighting%2C%20modern%20home%20interior%2C%20clean%20surfaces%20and%20organized%20space&width=400&height=300&seq=5&orientation=landscape",
    },
    {
      title: "Commercial Cleaning",
      description:
        "Professional cleaning solutions for offices and business spaces",
      icon: "fas fa-building",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Commercial%20office%20cleaning%20service%20with%20professional%20cleaners%20in%20uniform%2C%20modern%20office%20space%2C%20clean%20glass%20partitions%2C%20spotless%20floors%2C%20organized%20desk%20spaces%2C%20bright%20corporate%20environment&width=400&height=300&seq=6&orientation=landscape",
    },
    {
      title: "Deep Cleaning",
      description: "Intensive cleaning service addressing hard-to-reach areas",
      icon: "fas fa-broom",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Deep%20cleaning%20service%20with%20professional%20cleaners%20using%20specialized%20equipment%2C%20detailed%20cleaning%20of%20kitchen%20appliances%2C%20bathroom%20fixtures%2C%20baseboards%2C%20and%20vents%2C%20spotless%20results%2C%20bright%20clean%20environment&width=400&height=300&seq=7&orientation=landscape",
    },
    {
      title: "Move-in/Move-out Cleaning",
      description:
        "Specialized cleaning for property transitions and real estate",
      icon: "fas fa-truck-moving",
      imageUrl:
        "https://readdy.ai/api/search-image?query=Move-in%20move-out%20cleaning%20service%20with%20empty%20apartment%20being%20thoroughly%20cleaned%2C%20professional%20cleaners%20working%20on%20windows%2C%20floors%2C%20and%20appliances%2C%20moving%20boxes%20in%20background%2C%20bright%20empty%20space&width=400&height=300&seq=8&orientation=landscape",
    },
  ];
  const clients = [
    { name: "Global Tech", icon: "fab fa-apple" },
    { name: "Legal Partners", icon: "fas fa-landmark" },
    { name: "Sunshine Properties", icon: "fas fa-building" },
    { name: "Creative Studios", icon: "fas fa-paint-brush" },
    { name: "EduSystems", icon: "fas fa-graduation-cap" },
    { name: "HealthPlus", icon: "fas fa-hospital" },
  ];
  return (
    <div className="">
      {/* Header */}
        
        <main className="pt-20 pb-12">
          {/* Home Tab */}
          {activeTab === "home" && (
            <>
              {/* Hero Section */}
              <div className="relative h-[600px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"
                  style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20office%20environment%20with%20clean%20modern%20workspace%20and%20multilingual%20documents%2C%20bright%20natural%20lighting%2C%20organized%20desk%20with%20translation%20materials%20and%20cleaning%20supplies%20visible%20in%20background%2C%20blue%20color%20scheme%2C%20minimalist%20design&width=1440&height=600&seq=9&orientation=landscape')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                  <div className="max-w-2xl text-black">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      Professional Translation & Cleaning Services
                    </h1>
                    <p className="text-xl mb-8">
                      Bridging languages and creating spotless environments for
                      homes and businesses acrossthe country.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
                      >
                        <Link href="/quotes">Request a Quote</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 text-black hover:bg-white/20 !rounded-button whitespace-nowrap"
                      >
                        Our Services <FaArrowRight className="fas fa-arrow-right ml-2"/>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Services Overview */}
              <ServiceOverview/>
              {/* Quick Quote */}
              <QuickQuote/>
              {/* Testimonials */}
              <Testimonials/>
              {/* Clients */}
              {/* <Clients/> */}
              {/* Why Choose Us */}
              <WhyUs/>
            </>
          )}
          {/* Translation Services Tab */}
          
          {/* Cleaning Services Tab */}
          
          {/* Quote Request Tab */}
        </main>
      {/* Footer */}
      
    </div>
  );
};
export default App;
