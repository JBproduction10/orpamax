import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'; // ✅ Use correct import from ShadCN or your UI layer

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

const TranslationBooking = () => {
  const [languageFrom, setLanguageFrom] = useState('');
  const [languageTo, setLanguageTo] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [urgency, setUrgency] = useState('');

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Translation Price Calculator
              </CardTitle>
              <CardDescription className="text-center">
                Get an instant estimate for your translation project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* From Language */}
                  <div className="space-y-2">
                    <label htmlFor="languageFrom">From Language</label>
                    <Select value={languageFrom} onValueChange={setLanguageFrom}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="swahili">Swahili</SelectItem>
                        <SelectItem value="lingala">Lingala</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* To Language */}
                  <div className="space-y-2">
                    <label htmlFor="languageTo">To Language</label>
                    <Select value={languageTo} onValueChange={setLanguageTo}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="swahili">Swahili</SelectItem>
                        <SelectItem value="lingala">Lingala</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Document Type */}
                <div className="space-y-2">
                  <label htmlFor="documentType">Document Type Or Interpretation</label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select document type or interpretation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Document</SelectItem>
                      <SelectItem value="technical">Technical Document</SelectItem>
                      <SelectItem value="legal">Legal Document</SelectItem>
                      <SelectItem value="medical">Medical Document</SelectItem>
                      <SelectItem value="interpretation">Interpretation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Word Count */}
                <div className="space-y-2">
                  <label htmlFor="wordCount">Word Count (Approximate)</label>
                  <Input
                    type="number"
                    id="wordCount"
                    placeholder="Enter number of words"
                    className="rounded-lg"
                  />
                </div>

                {/* Delivery Time */}
                <div className="space-y-2">
                  <label htmlFor="urgency">Delivery Time</label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (3–5 business days)</SelectItem>
                      <SelectItem value="express">Express (1–2 business days)</SelectItem>
                      <SelectItem value="urgent">Urgent (24 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full rounded-lg whitespace-nowrap">Calculate Price</Button>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  For more accurate quotes, please use our detailed quote request form.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranslationBooking;
