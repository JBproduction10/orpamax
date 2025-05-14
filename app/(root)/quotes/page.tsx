"use client";
import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from '@/components/ui/card';
import { Separator } from '@radix-ui/react-select';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { format } from "date-fns";
import { Button } from '@/components/ui/button';
import { FaBroom, FaCloudUploadAlt, FaLanguage } from 'react-icons/fa';
import TranslationQuote from '@/components/quote/TranslationQuote';
import CleaningQuote from '@/components/quote/CleaningQuote';
import QuoteContactForm from '@/components/quote/QuoteContactForm';
import { toast } from "sonner";

const Page = () => {
  const [resetKey, setResetKey] = useState(0);
  const [serviceType, setServiceType] = useState("translation");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [languageTo, setLanguageTo] = useState("");
  const [languageFrom, setLanguageFrom] = useState("");
  const [documentType, setDocumentType] = useState("general");
  const [urgency, setUrgency] = useState("standard");
  const [wordCount, setWordCount] = useState("");
  const [cleaningType, setCleaningType] = useState("standard");
  const [propertyType, setPropertyType] = useState("residential");
  const [squareFootage, setSquareFootage] = useState("");
  const [bedrooms, setBedrooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("2");
  const [frequency, setFrequency] = useState("onetime");
  const [preferredTime, setPreferredTime] = useState("morning");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("serviceType", serviceType);
    formData.append("selectedDate", selectedDate ? format(selectedDate, "PPP") : "Not specified");
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("company", company);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip", zip);
    formData.append("message", message);

    if (serviceType === 'translation') {
      formData.append("languageFrom", languageFrom);
      formData.append("languageTo", languageTo);
      formData.append("documentType", documentType);
      formData.append("urgency", urgency);
      formData.append("wordCount", wordCount);
      if (file) formData.append("file", file);
    } else {
      formData.append("cleaningType", cleaningType);
      formData.append("propertyType", propertyType);
      formData.append("squareFootage", squareFootage);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", bathrooms);
      formData.append("frequency", frequency);
      formData.append("preferredTime", preferredTime);
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send email');

      toast.success("Quote request submitted successfully!");

      setResetKey(prev => prev + 1);
      setServiceType("translation");
      setSelectedDate(undefined);
      setLanguageTo("");
      setLanguageFrom("");
      setDocumentType("general");
      setUrgency("standard");
      setWordCount("");
      setCleaningType("standard");
      setPropertyType("residential");
      setSquareFootage("");
      setBedrooms("2");
      setBathrooms("2");
      setFrequency("onetime");
      setPreferredTime("morning");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-48 shadow-2xl bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fill out the form below to get a personalized quote for our services.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle>Service Quote Request</CardTitle>
            <CardDescription>
              Please provide details about the service you need
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="serviceType">Service Type</label>
                  <Tabs
                    value={serviceType}
                    onValueChange={setServiceType}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="translation"
                        className="rounded whitespace-nowrap data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                      >
                        {/* <FaLanguage className="mr-2" /> */}
                        Translation Services
                      </TabsTrigger>
                      <TabsTrigger
                        value="cleaning"
                        className="rounded whitespace-nowrap data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                      >
                        {/* <FaBroom className="mr-2" /> */}
                        Cleaning Services
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {serviceType === "translation" ? (
                  <TranslationQuote
                    key={resetKey}
                    languageTo={languageTo}
                    setLanguageTo={setLanguageTo}
                    languageFrom={languageFrom}
                    setLanguageFrom={setLanguageFrom}
                    documentType={documentType}
                    setDocumentType={setDocumentType}
                    wordCount={wordCount}
                    setWordCount={setWordCount}
                    urgency={urgency}
                    setUrgency={setUrgency}
                  />
                ) : (
                  <CleaningQuote
                    key={resetKey}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    cleaningType={cleaningType}
                    setCleaningType={setCleaningType}
                    propertyType={propertyType}
                    setPropertyType={setPropertyType}
                    squareFootage={squareFootage}
                    setSquareFootage={setSquareFootage}
                    bedrooms={bedrooms}
                    setBedrooms={setBedrooms}
                    bathrooms={bathrooms}
                    setBathrooms={setBathrooms}
                    frequency={frequency}
                    setFrequency={setFrequency}
                    preferredTime={preferredTime}
                    setPreferredTime={setPreferredTime}
                  />
                )}

                <Separator />

                <div className="space-y-6">
                  <QuoteContactForm
                    key={resetKey}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phone={phone}
                    company={company}
                    address={address}
                    city={city}
                    state={state}
                    zip={zip}
                    message={message}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setCompany={setCompany}
                    setAddress={setAddress}
                    setCity={setCity}
                    setState={setState}
                    setZip={setZip}
                    setMessage={setMessage}
                  />

                  {serviceType === "translation" && (
                    <div className="space-y-2">
                      <label htmlFor="fileUpload">Upload Document (Optional)</label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => document.getElementById('fileUpload')?.click()}
                      >
                        <input
                          type="file"
                          id="fileUpload"
                          className="hidden"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <FaCloudUploadAlt className="text-blue-500 text-3xl mb-2" />
                        <p className="text-gray-500 mb-1">
                          {file ? file.name : 'Drag and drop your file here, or click to browse'}
                        </p>
                        <p className="text-xs text-gray-400">
                          Supports PDF, DOCX, XLSX, PPTX (Max 20MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Quote Request'}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Page;
