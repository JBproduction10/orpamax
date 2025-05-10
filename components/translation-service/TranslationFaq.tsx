import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { FaQuestion } from 'react-icons/fa';

const faqData = {
  general: [
    {
      question: "What languages do you translate?",
      answer:
        "We offer translation services for over 50 languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and many more. If you need a specific language pair, please contact us to confirm availability.",
    },
    {
      question: "Are your translators certified?",
      answer:
        "Yes, our translation team consists of certified professional translators with expertise in various fields. For official documents requiring certified translations, we provide certification and notarization services as needed.",
    },
    {
      question: "How do you ensure translation quality?",
      answer:
        "We follow a rigorous quality assurance process that includes translation by a native speaker, editing by a second linguist, and final proofreading before delivery. We also use specialized terminology management systems to ensure consistency.",
    },
  ],
  process: [
    {
      question: "How do I submit documents for translation?",
      answer:
        "You can submit your documents through our secure online portal, via email, or by using our quote request form. We accept most file formats including Word, PDF, Excel, PowerPoint, and InDesign files.",
    },
    {
      question: "What is your typical turnaround time?",
      answer:
        "Turnaround time depends on the document length, complexity, and language pair. Standard delivery is typically 3-5 business days, while express and urgent options are available for faster delivery at additional cost.",
    },
    {
      question: "Do you offer revisions after delivery?",
      answer:
        "Yes, we offer one round of revisions free of charge within 7 days of delivery. Additional revision requests may incur extra fees depending on the extent of changes requested.",
    },
  ],
  pricing: [
    {
      question: "How do you calculate translation costs?",
      answer:
        "Our pricing is typically based on word count, language pair, subject matter complexity, and delivery timeline. Technical, legal, and medical translations may have higher rates due to specialized terminology requirements.",
    },
    {
      question: "Do you offer volume discounts?",
      answer:
        "Yes, we offer discounted rates for large projects and ongoing translation needs. We can also create customized pricing packages for clients with regular translation requirements.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, PayPal, bank transfers, and corporate purchase orders. For large projects, we typically require a deposit before beginning work, with the balance due upon completion.",
    },
  ],
};

const TranslationFaq = () => {
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
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {Object.keys(faqData).map((section) => (
                <TabsTrigger
                  key={section}
                  value={section}
                  className="rounded-lg whitespace-nowrap"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(faqData).map(([section, faqItems]) => (
              <TabsContent key={section} value={section}>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <Card key={index} className="border-2 border-blue-100">
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
