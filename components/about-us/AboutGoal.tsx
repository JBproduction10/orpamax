'use client';

import { useEffect, useState } from 'react';

type Goal = {
  _id: string;
  type: 'vision' | 'mission';
  title: string;
  description: string;
  imageUrl: {
    secure_url: string;
    public_id: string;
  };
};

const AboutGoal = () => {
  const [vision, setVision] = useState<Goal | null>(null);
  const [mission, setMission] = useState<Goal | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch('/api/about/about-goal');
        const data: Goal[] = await res.json();

        setVision(data.find(goal => goal.type === 'vision') || null);
        setMission(data.find(goal => goal.type === 'mission') || null);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <section className="bg-gray-50 py-20 px-6 sm:px-10 lg:px-32">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-gray-800">Our Goal & Mission</h3>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Empowering cleaner spaces and clearer communication through professional services tailored for modern businesses and communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Vision */}
        {vision && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <img
              src={vision.imageUrl.secure_url}
              alt={vision.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">{vision.title}</h4>
              <p className="text-gray-600">{vision.description}</p>
            </div>
          </div>
        )}

        {/* Mission */}
        {mission && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <img
              src={mission.imageUrl.secure_url}
              alt={mission.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">{mission.title}</h4>
              <p className="text-gray-600">{mission.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutGoal;
