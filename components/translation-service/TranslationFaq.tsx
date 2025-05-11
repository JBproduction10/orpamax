'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FaQuestion } from 'react-icons/fa';
import clsx from 'clsx'; // Optional: for cleaner conditional classes

type Faq = {
  _id: string;
  category: string;
  question: string;
  answer: string;
};

const TranslationFaq = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [groupedFaqs, setGroupedFaqs] = useState<Record<string, Faq[]>>({});
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    fetch('/api/translation/translation-faq')
      .then((res) => res.json())
      .then((data: Faq[]) => {
        const groups: Record<string, Faq[]> = {};
        data.forEach((faq) => {
          const category = faq.category.toLowerCase();
          if (!groups[category]) groups[category] = [];
          groups[category].push(faq);
        });

        const uniqueCategories = Object.keys(groups);
        setFaqs(data);
        setGroupedFaqs(groups);
        setCategories(uniqueCategories);
        setActiveTab(uniqueCategories[0]); // Set default selected tab
      });
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our translation services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={clsx(
                    'rounded-lg capitalize px-4 py-2 transition-colors',
                    activeTab === category
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-white text-gray-700 hover:bg-blue-100'
                  )}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-4">
                  {groupedFaqs[category].map((faq) => (
                    <Card key={faq._id} className="border-2 border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <FaQuestion className="text-blue-600 mr-2" />
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TranslationFaq;
