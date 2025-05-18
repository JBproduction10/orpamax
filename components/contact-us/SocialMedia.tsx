'use client';
import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const SocialMedia = () => {
  const [data, setData] = useState({ facebook: '', instagram: '', linkedin: '' });

  useEffect(() => {
    fetch('/api/contact-us/social')
      .then(res => res.json())
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setData(res[0]);
        } else {
          console.warn("No social media data found, using defaults.");
        }
      })
      .catch(err => {
        console.error("Failed to fetch social media links:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <a href={data.facebook || '#'} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2">
          <FaFacebook className="text-white" />
        </div>
        <span className="text-sm">Facebook</span>
      </a>
      <a href={data.instagram || '#'} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center mb-2">
          <FaInstagram className="text-white" />
        </div>
        <span className="text-sm">Instagram</span>
      </a>
      <a href={data.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mb-2">
          <FaLinkedin className="text-white" />
        </div>
        <span className="text-sm">LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialMedia;
