'use client'

import React from 'react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import { format } from 'date-fns'

// Mapped data
const timeOptions = [
  { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)' },
  { value: 'afternoon', label: 'Afternoon (12:00 PM - 4:00 PM)' },
  { value: 'evening', label: 'Evening (4:00 PM - 8:00 PM)' },
]

const serviceOptions = [
  { value: 'standard', label: 'Standard Clean' },
  { value: 'deep', label: 'Deep Clean' },
  { value: 'move', label: 'Move-In/Out Clean' },
  { value: 'office', label: 'Office Clean' },
]

type CleaningBookingProps = {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  selectedTime: string
  setSelectedTime: (value: string) => void
  selectedService: string
  setSelectedService: (value: string) => void
  message: string
  setMessage: (value: string) => void
}

const CleaningBooking: React.FC<CleaningBookingProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedService,
  setSelectedService,
  message,
  setMessage,
}) => {
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      selectedDate,
      selectedTime,
      selectedService,
      message,
    }

    try {
      const response = await fetch('/api/send-cleaning-booking-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Your booking request has been sent successfully!')
        setSelectedDate(undefined)
        setSelectedTime('')
        setSelectedService('')
        setMessage('')
      } else {
        toast.error('There was an error sending your booking request.')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred while sending the request.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Book Your Cleaning Service</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select your preferred date and time for your cleaning service.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleFormSubmit}>
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle>Select Date and Time</CardTitle>
              <CardDescription>Choose your preferred cleaning schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Picker */}
                <div>
                  <label className="mb-2 block">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal rounded whitespace-nowrap"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Select */}
                <div>
                  <label className="mb-2 block">Select Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Service Type */}
              <div className="mt-8">
                <label className="mb-2 block">Service Type</label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Instructions */}
              <div className="mt-8">
                <label className="mb-2 block">Special Instructions</label>
                <Textarea
                  placeholder="Any specific areas to focus on or special instructions for our cleaning team"
                  className="rounded-lg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-lg whitespace-nowrap" type="submit">
                Book Cleaning Service
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default CleaningBooking
