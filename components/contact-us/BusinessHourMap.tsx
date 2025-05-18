'use client'

import useSWR from 'swr'
import { FaClock, FaMapMarker, FaDirections } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link'

// Types
type BusinessHour = {
  day: string
  open: string
  close: string
}

type Location = {
  lat: number
  lng: number
  city: string
  state: string
}

type BusinessInfo = {
  hours: BusinessHour[]
  holidayHours: string
  emergencyMessage: string
  location: Location
}

// Fetcher
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
})

// Default days
const DEFAULT_DAYS = ['Monday - Friday', 'Saturday', 'Sunday']

export default function BusinessHourMap() {
  const { data, error, isLoading } = useSWR<BusinessInfo[]>('/api/contact-us/business-info', fetcher)

  if (isLoading) return <div>Loading business info...</div>
  if (error) return <div>Error loading data: {error.message}</div>

  const info = data?.[0]
  if (!info) return <div>No business info found.</div>

  // Normalize hours
  const normalizedHours = DEFAULT_DAYS.map(day => {
    const match = info.hours.find(h => h.day === day)
    return {
      day,
      open: match?.open || 'Closed',
      close: match?.close || '',
    }
  })

  const mapImageUrl =
    info.location?.lat && info.location?.lng
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${info.location.lat},${info.location.lng}&zoom=14&size=600x300&markers=color:red%7C${info.location.lat},${info.location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      : null
  console.log(mapImageUrl)
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">Business Hours</h2>
            <Card className="border-2 border-blue-100">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {normalizedHours.map(hour => (
                    <div key={hour.day} className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <FaClock className="text-blue-600 mr-3" />
                        <span className="font-medium">{hour.day}</span>
                      </div>
                      <span>{hour.open} {hour.close && `- ${hour.close}`}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Holiday Hours</h3>
                  <p className="text-gray-600">{info.holidayHours}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Emergency Services</h3>
                  <p className="text-gray-600">{info.emergencyMessage}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Find Us</h2>
            <Card className="border-2 border-blue-100 overflow-hidden">
              <div className="h-[300px] bg-gray-200 relative">
                {mapImageUrl ? (
                  <img src={mapImageUrl} alt="Map" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-600">No map available</div>
                )}
                {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-3 rounded-lg shadow-lg">
                    <FaMapMarker className="text-red-500 text-2xl" />
                  </div>
                </div> */}
              </div>
              <CardContent className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{info.location.city}</p>
                    <p className="text-sm text-gray-500">{info.location.state}</p>
                  </div>
                  <Link
                    href={`https://www.google.com/maps/dir/?api=1&destination=${info.location.lat},${info.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm">
                      <FaDirections className="mr-2" />
                      Directions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
