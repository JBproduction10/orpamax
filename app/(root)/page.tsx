"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ServiceOverview from "@/components/ServiceOverview";
import QuickQuote from "@/components/QuickQuote";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const clients = [
    { name: "Global Tech", icon: "fab fa-apple" },
    { name: "Legal Partners", icon: "fas fa-landmark" },
    { name: "Sunshine Properties", icon: "fas fa-building" },
    { name: "Creative Studios", icon: "fas fa-paint-brush" },
    { name: "EduSystems", icon: "fas fa-graduation-cap" },
    { name: "HealthPlus", icon: "fas fa-hospital" },
  ];
  const [homeHero, setHomeHero] = useState({title: "", description: "", image: ""});
  const [existingContent, setExistingContent] = useState(null);

  useEffect(() => {
    fetch("/api/home/hero")
    .then(res => res.json())
    .then(data => {
      if (data) {
        setHomeHero(data);
        setExistingContent(data);
      }
    })
  }, []);

  const handleSave = async () => {
    await fetch("/api/home/hero", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(homeHero),
    });
    alert("Hero section updated!");
  };
  

  const handleDelete = async () => {
    await fetch("/api/home/hero", {
      method: "DELETE",
    });
    alert("Hero section deleted!");
  };
  

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
                    backgroundImage: `url(${homeHero.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                  <div className="max-w-2xl text-black">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {homeHero.title}
                    </h1>
                    <p className="text-xl mb-8">
                      {homeHero.description}
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
