// TranslationBooking.tsx
'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
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
  const [wordCount, setWordCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/send-translation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          languageFrom,
          languageTo,
          documentType,
          urgency,
          wordCount,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setLanguageFrom('');
        setLanguageTo('');
        setDocumentType('');
        setUrgency('');
        setWordCount('');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

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
                {/* language selectors, document type, etc. */}
                {/* ...keep all inputs the same... */}
                <div className="space-y-2">
                  <label htmlFor="wordCount">Word Count (Approximate)</label>
                  <Input
                    type="number"
                    id="wordCount"
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                    placeholder="Enter number of words"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-lg whitespace-nowrap"
              >
                {loading ? 'Sending...' : 'Submit'}
              </Button>
              {success && (
                <p className="text-sm text-green-600 text-center">
                  Your request has been sent to our admin. We'll contact you shortly!
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranslationBooking;
