import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import React from 'react'
import { Button } from '@/components/ui/button';

const faqItems = [
    {
      question: "What areas do you service?",
      answer:
        "We currently provide our cleaning and translation services in Portland, Maine and surrounding areas, we can work with clients worldwide through our online platform.",
    },
    {
      question: "How do I schedule a cleaning service?",
      answer:
        "You can schedule a cleaning service by filling out our contact form, calling our customer service line at (123) 456-7890, or using our online booking system. We recommend booking at least 48 hours in advance to ensure availability.",
    },
    {
      question: "What languages do you translate?",
      answer:
        "Our professional translators cover over 3 languages including French, Lingala, Swahili, and many more. If you need a specific language pair, please contact us to confirm availability.",
    },
    {
      question: "Do you provide certified translations?",
      answer:
        "Yes, we offer certified translation services for official documents such as birth certificates, marriage certificates, academic transcripts, and legal documents. Our certified translations are accepted by USCIS, educational institutions, and courts.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "For cleaning services, we require at least 24 hours notice for cancellations. Late cancellations (less than 24 hours) may incur a fee of 50% of the service cost. For translation projects, cancellation terms depend on the project size and completion status.",
    },
    {
      question: "Do you bring your own cleaning supplies?",
      answer:
        "Yes, our professional cleaning teams bring all necessary cleaning supplies and equipment. We use eco-friendly products as our standard offering. If you have specific product preferences or sensitivities, please let us know in advance.",
    },
  ];

const ContactFaq = () => {
    return (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our services.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-blue-100"
                >
                  <AccordionTrigger className="text-left font-medium hover:text-blue-600 py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Don't see your question here?
              </p>
              <Button className="!rounded-button whitespace-nowrap">
                <i className="fas fa-question-circle mr-2"></i> Ask a Question
              </Button>
            </div>
          </div>
        </div>
    )
}

export default ContactFaq;