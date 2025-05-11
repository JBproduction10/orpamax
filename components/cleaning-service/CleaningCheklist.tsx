'use client';

import React, { JSX, useEffect, useState } from 'react';
import {
  FaUtensils,
  FaBath,
  FaCouch,
  FaBed,
  FaCheck
} from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../ui/card';
import { ChecklistSection } from '@/types/types';

const iconMap: Record<string, JSX.Element> = {
  kitchen: <FaUtensils className="text-blue-600 mr-2" />,
  bathroom: <FaBath className="text-blue-600 mr-2" />,
  'living areas': <FaCouch className="text-blue-600 mr-2" />,
  bedrooms: <FaBed className="text-blue-600 mr-2" />
};

const CleaningChecklist = () => {
  const [sections, setSections] = useState<ChecklistSection[]>([]);

  useEffect(() => {
    fetch('/api/admin/cleaning/checklist')
      .then(res => res.json())
      .then((data: ChecklistSection[]) => {
        const cleaned = data.map(section => ({
          ...section,
          items: Array.isArray(section.items) ? section.items : []
        }));
        setSections(cleaned);
      })
      .catch(err => console.error('Failed to fetch checklist:', err));
  }, []);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Cleaning Checklist</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here's what our standard cleaning service includes for each area of your home or office.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sections.map((section, idx) => (
            <Card key={idx} className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center capitalize">
                  {iconMap[section.title.toLowerCase()] || null}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CleaningChecklist;
