'use client';
import React, { useEffect, useState } from 'react';
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
import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner'

const TranslationBooking = () => {
  const [languageFrom, setLanguageFrom] = useState('');
  const [languageTo, setLanguageTo] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [urgencies, setUrgencies] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const res = await fetch('/api/translation/translation-options');
      const data = await res.json();
      setLanguages(data.filter((opt: any) => opt.type === 'language'));
      setDocumentTypes(data.filter((opt: any) => opt.type === 'documentType'));
      setUrgencies(data.filter((opt: any) => opt.type === 'urgency'));
    };
    fetchOptions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Construct the payload with all form fields
      const payload = {
        languageFrom,
        languageTo,
        documentType,
        urgency,
        wordCount,
      };

      const res = await fetch('/api/send-translation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Check if the response is successful
      if (res.ok) {
        setSuccess(true);
        toast.success('Your booking request has been sent successfully!')
        // Reset form fields after successful submission
        setLanguageFrom('');
        setLanguageTo('');
        setDocumentType('');
        setUrgency('');
        setWordCount('');
      } else {
        console.error('Failed to submit form');
        toast.error('There was an error sending your booking request.')
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred while sending the request.')
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>From Language</Label>
                    <Select value={languageFrom} onValueChange={setLanguageFrom}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang: any) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>To Language</Label>
                    <Select value={languageTo} onValueChange={setLanguageTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang: any) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Document Type or Interpretation</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((doc: any) => (
                        <SelectItem key={doc.value} value={doc.value}>
                          {doc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Word Count (Approximate)</Label>
                  <Input
                    type="number"
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                    placeholder="Enter number of words"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Delivery Time</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencies.map((u: any) => (
                        <SelectItem key={u.value} value={u.value}>
                          {u.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={handleSubmit} disabled={loading} className="w-full">
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
