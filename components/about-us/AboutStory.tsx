'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Story = {
  _id: string;
  title: string;
  paragraphs: string[];
  imageUrl: {
    secure_url: string;
    public_id: string;
  };
};

export default function AboutStory() {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchStory = async () => {
    try {
      const res = await fetch('/api/about/about-story');
      const data = await res.json();
      setStory(Array.isArray(data) ? data[0] : data); // handles both array or object response
    } catch (err) {
      console.error('Failed to load story:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchStory();
}, []);


  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!story) return <p className="text-center text-red-500 py-20">Story not found.</p>;

  return (
    <section className="bg-white py-20 px-6 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
            The <span className="text-orange-600">{story.title}</span> Story
          </h2>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            {story.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
            <Image
              src={story.imageUrl.secure_url}
              alt={`${story.title} Image`}
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
}
