import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils'
import { format } from 'date-fns';

const CleaningQuote = ({
    selectedDate,
    setSelectedDate,
    cleaningType,
    setCleaningType,
    propertyType,
    setPropertyType,
    squareFootage,
    setSquareFootage,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    frequency,
    setFrequency,
    preferredTime,
    setPreferredTime,
}: {
    selectedDate: Date | undefined;
    setSelectedDate: (date: Date | undefined) => void;
    cleaningType: string;
    setCleaningType: (val: string) => void;
    propertyType: string;
    setPropertyType: (val: string) => void;
    squareFootage: string;
    setSquareFootage: (val: string) => void;
    bedrooms: string;
    setBedrooms: (val: string) => void;
    bathrooms: string;
    setBathrooms: (val: string) => void;
    frequency: string;
    setFrequency: (val: string) => void;
    preferredTime: string;
    setPreferredTime: (val: string) => void;
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="cleaningType">Cleaning Type</label>
                <Select
                    value={cleaningType}
                    onValueChange={setCleaningType}
                >
                    <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select cleaning type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="standard">Standard Clean</SelectItem>
                        <SelectItem value="deep">Deep Clean</SelectItem>
                        <SelectItem value="move">Move-In/Out Clean</SelectItem>
                        <SelectItem value="office">Office Clean</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label htmlFor="propertyType">Property Type</label>
                <Select
                    value={propertyType}
                    onValueChange={setPropertyType}
                >
                    <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="residential">Residential Home</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="office">Office Space</SelectItem>
                        <SelectItem value="commercial">Commercial Property</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="squareFootage">Square Footage</label>
                    <Input
                        type="number"
                        id="squareFootage"
                        placeholder="Approximate square feet"
                        className="rounded-full"
                        value={squareFootage}
                        onChange={(e) => setSquareFootage(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="bedrooms">Bedrooms/Offices</label>
                    <Select
                        value={bedrooms}
                        onValueChange={setBedrooms}
                    >
                        <SelectTrigger className="rounded-full">
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
                    <Select
                        value={bathrooms}
                        onValueChange={setBathrooms}
                    >
                        <SelectTrigger className="rounded-full">
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
                    <label htmlFor="frequency">Service Frequency</label>
                    <Select
                        value={frequency}
                        onValueChange={setFrequency}
                    >
                        <SelectTrigger className="rounded-full">
                            <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="onetime">One-time Service</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
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
                    <Select
                        value={preferredTime}
                        onValueChange={setPreferredTime}
                    >
                        <SelectTrigger className="rounded-full">
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                            <SelectItem value="evening">Evening (4:00 PM - 8:00 PM)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default CleaningQuote;