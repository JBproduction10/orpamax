"use client"
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Separator } from '@radix-ui/react-select'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import React from 'react'
import { Button } from '@/components/ui/button'

const page = () => {
    const [serviceType, setServiceType] = useState("translation");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [languageTo, setLanguageTo] = useState("spanish");
    const [languageFrom, setLanguageFrom] = useState("english");
    return (
        <>
            <div className="container mx-auto px-4 py-48 shadow-2xl bg-gray-100">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Request a Quote</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Fill out the form below to get a personalized quote for our
                        services.
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
                        <CardContent>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="serviceType">Service Type</label>
                                <Tabs
                                    defaultValue={serviceType}
                                    onValueChange={setServiceType}
                                    className="w-full"
                                >
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger
                                            value="translation"
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            <i className="fas fa-language mr-2"></i>
                                            Translation Services
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="cleaning"
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            <i className="fas fa-broom mr-2"></i>
                                            Cleaning Services
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            {serviceType === "translation" ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="languageFrom">
                                        From Language
                                        </label>
                                        <Select
                                        value={languageFrom}
                                        onValueChange={setLanguageFrom}
                                        >
                                        <SelectTrigger className="!rounded-button">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="english">
                                            English
                                            </SelectItem>
                                            <SelectItem value="spanish">
                                            Spanish
                                            </SelectItem>
                                            <SelectItem value="french">French</SelectItem>
                                            <SelectItem value="german">German</SelectItem>
                                            <SelectItem value="chinese">
                                            Chinese
                                            </SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="languageTo">To Language</label>
                                        <Select
                                        value={languageTo}
                                        onValueChange={setLanguageTo}
                                        >
                                        <SelectTrigger className="!rounded-button">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="english">
                                            English
                                            </SelectItem>
                                            <SelectItem value="spanish">
                                            Spanish
                                            </SelectItem>
                                            <SelectItem value="french">French</SelectItem>
                                            <SelectItem value="german">German</SelectItem>
                                            <SelectItem value="chinese">
                                            Chinese
                                            </SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="documentType">Document Type</label>
                                    <Select defaultValue="general">
                                        <SelectTrigger className="!rounded-button">
                                        <SelectValue placeholder="Select document type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="general">
                                            General Document
                                        </SelectItem>
                                        <SelectItem value="technical">
                                            Technical Document
                                        </SelectItem>
                                        <SelectItem value="legal">
                                            Legal Document
                                        </SelectItem>
                                        <SelectItem value="medical">
                                            Medical Document
                                        </SelectItem>
                                        <SelectItem value="website">
                                            Website Content
                                        </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="wordCount">
                                    Word Count (Approximate)
                                </label>
                                <Input
                                    type="number"
                                    id="wordCount"
                                    placeholder="Enter number of words"
                                    className="!rounded-button"
                                />
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="urgency">Delivery Time</label>
                                <Select defaultValue="standard">
                                    <SelectTrigger className="!rounded-button">
                                    <SelectValue placeholder="Select urgency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="standard">
                                        Standard (3-5 business days)
                                    </SelectItem>
                                    <SelectItem value="express">
                                        Express (1-2 business days)
                                    </SelectItem>
                                    <SelectItem value="urgent">
                                        Urgent (24 hours)
                                    </SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="fileUpload">
                                    Upload Document (Optional)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <i className="fas fa-cloud-upload-alt text-blue-500 text-3xl mb-2"></i>
                                    <p className="text-gray-500 mb-1">
                                    Drag and drop your file here, or click to browse
                                    </p>
                                    <p className="text-xs text-gray-400">
                                    Supports PDF, DOCX, XLSX, PPTX (Max 20MB)
                                    </p>
                                </div>
                                </div>
                            </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="cleaningType">Cleaning Type</label>
                                        <Select defaultValue="standard">
                                            <SelectTrigger className="!rounded-button">
                                                <SelectValue placeholder="Select cleaning type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="standard">
                                                    Standard Clean
                                                </SelectItem>
                                                <SelectItem value="deep">Deep Clean</SelectItem>
                                                <SelectItem value="move">
                                                    Move-In/Out Clean
                                                </SelectItem>
                                                <SelectItem value="office">
                                                    Office Clean
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="propertyType">Property Type</label>
                                        <Select defaultValue="residential">
                                            <SelectTrigger className="!rounded-button">
                                                <SelectValue placeholder="Select property type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="residential">
                                                Residential Home
                                            </SelectItem>
                                            <SelectItem value="apartment">
                                                Apartment
                                            </SelectItem>
                                            <SelectItem value="office">
                                                Office Space
                                            </SelectItem>
                                            <SelectItem value="commercial">
                                                Commercial Property
                                            </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="squareFootage">
                                            Square Footage
                                            </label>
                                            <Input
                                            type="number"
                                            id="squareFootage"
                                            placeholder="Approximate square feet"
                                            className="!rounded-button"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="bedrooms">Bedrooms/Offices</label>
                                            <Select defaultValue="2">
                                            <SelectTrigger className="!rounded-button">
                                                <SelectValue placeholder="Select number" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5+">5+</SelectItem>
                                            </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="bathrooms">Bathrooms</label>
                                            <Select defaultValue="2">
                                            <SelectTrigger className="!rounded-button">
                                                <SelectValue placeholder="Select number" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5+">5+</SelectItem>
                                            </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="frequency">
                                                Service Frequency
                                            </label>
                                            <Select defaultValue="onetime">
                                                <SelectTrigger className="!rounded-button">
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="onetime">
                                                    One-time Service
                                                    </SelectItem>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                    <SelectItem value="biweekly">
                                                    Bi-weekly
                                                    </SelectItem>
                                                    <SelectItem value="monthly">
                                                    Monthly
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label>Preferred Date and Time</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal rounded whitespace-nowrap",
                                                            !selectedDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {/* <Calendar className="mr-2 h-4 w-4" /> */}
                                                        {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 bg-white border rounded-lg shadow-lg z-50">
                                                    <Calendar
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={setSelectedDate}
                                                        initialFocus
                                                        />
                                                </PopoverContent>
                                            </Popover>
                                            <Select defaultValue="morning">
                                            <SelectTrigger className="!rounded-button">
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="morning">
                                                Morning (8:00 AM - 12:00 PM)
                                                </SelectItem>
                                                <SelectItem value="afternoon">
                                                Afternoon (12:00 PM - 4:00 PM)
                                                </SelectItem>
                                                <SelectItem value="evening">
                                                Evening (4:00 PM - 8:00 PM)
                                                </SelectItem>
                                            </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Separator />
                            <div className="space-y-6">
                            <h3 className="text-lg font-medium">
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                <label htmlFor="firstName">First Name</label>
                                <Input
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    className="!rounded-button"
                                />
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="lastName">Last Name</label>
                                <Input
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    className="!rounded-button"
                                />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                <label htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="!rounded-button"
                                />
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="phone">Phone</label>
                                <Input
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    className="!rounded-button"
                                />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="company">Company (Optional)</label>
                                <Input
                                id="company"
                                placeholder="Enter your company name"
                                className="!rounded-button"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="address">Address</label>
                                <Input
                                id="address"
                                placeholder="Enter your address"
                                className="!rounded-button"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                <label htmlFor="city">City</label>
                                <Input
                                    id="city"
                                    placeholder="City"
                                    className="!rounded-button"
                                />
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="state">State/Province</label>
                                <Input
                                    id="state"
                                    placeholder="State/Province"
                                    className="!rounded-button"
                                />
                                </div>
                                <div className="space-y-2">
                                <label htmlFor="zip">Zip/Postal Code</label>
                                <Input
                                    id="zip"
                                    placeholder="Zip/Postal Code"
                                    className="!rounded-button"
                                />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message">
                                Additional Information
                                </label>
                                <Textarea
                                id="message"
                                placeholder="Any specific requirements or questions"
                                className="min-h-[100px] !rounded-button"
                                />
                            </div>
                            </div>
                        </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full !rounded-button whitespace-nowrap">
                            Submit Quote Request
                        </Button>
                        <p className="text-xs text-gray-500 text-center">
                            By submitting this form, you agree to our{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                            </a>
                            .
                        </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default page