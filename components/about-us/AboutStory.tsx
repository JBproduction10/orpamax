import Image from "next/image";
import React from "react";

const AboutStory = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
            The <span className="text-orange-600">ORPAMAX</span> Story
          </h2>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              ORPAMAX was founded in 2018 by Tshabela (Patrick) Bakajika in Johannesburg, South Africa. 
              What started as a community-focused home renovation initiative has grown into a company with purpose and passion.
            </p>

            <p>
              In March 2022, Patrick relocated to Portland, Maine, USA. Since then, we’ve collaborated with a diverse range of clients to turn their ideas into tangible impact.
            </p>

            <p>
              Our company stands by the slogan:{" "}
              <span className="italic font-semibold text-orange-600">"Small to Care & Big in Delivery"</span>. 
              Experience our work firsthand — we’re confident you’ll be amazed.
            </p>

            <p>
              Today, ORPAMAX specializes in commercial cleaning, translation, and interpretation. 
              We love tackling complex challenges and delivering top-tier service.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/assets/images/portland1.jpg"
              alt="ORPAMAX founder in Portland"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
