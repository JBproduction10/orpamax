import React from "react";
import AboutGoal from "@/components/about-us/AboutGoal";
import AboutStory from "@/components/about-us/AboutStory";

const AboutSection = () => {
  return (
    <div className="bg-gray-50 text-gray-800 mt-10">
      {/* Hero / Intro Section */}
      <section className="relative bg-[#0F172A] text-white py-24 px-6 md:px-12 lg:px-32">
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <h2 className="text-lg uppercase tracking-widest text-orange-400 font-semibold mb-4">
            About Us
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Small to Care,<br className="hidden sm:block" /> Big to Delivery
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We combine personal care with professional scale, offering unmatched cleaning and language services with integrity and precision.
          </p>
          {/* Optional Call to Action */}
          {/* <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
            Learn More
          </button> */}
        </div>

        {/* Optional background effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      </section>

      {/* Our Goal & Mission Section */}
      <AboutGoal />

      {/* Our Story Section */}
      <AboutStory />
    </div>
  );
};

export default AboutSection;
