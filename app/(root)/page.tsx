"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Button } from "@/components/ui/button";
import ServiceOverview from "@/components/ServiceOverview";
import QuickQuote from "@/components/QuickQuote";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const App: React.FC = () => {
  const [heroes, setHeroes] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/home/hero", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error("Failed to fetch hero data", err));
  }, []);

  return (
    <div>
      <main className="pt-20 pb-12">
        {heroes.length > 0 && (
          <div className="relative h-[600px] overflow-hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop={true}
              className="h-full w-full"
            >
              {heroes.map((hero, idx) =>
                hero.imageUrl?.map((img: any, imgIdx: number) => (
                  <SwiperSlide key={`${idx}-${imgIdx}`}>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${img.secure_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent z-0" /> */}
                    </div>

                    <div className="relative container mx-auto px-4 h-full flex flex-col justify-center z-10 text-white">
                      <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                          {hero.title}
                        </h1>
                        <p className="text-xl mb-8">{hero.description}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/quotes">Request a Quote</Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            className="bg-white/10 text-white hover:bg-white/20"
                          >
                            Our Services <FaArrowRight className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        )}
        <ServiceOverview />
        <QuickQuote />
        <Testimonials />
        <WhyUs />
      </main>
    </div>
  );
};

export default App;
