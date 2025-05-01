'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaClock, FaMapMarker, FaDirections } from 'react-icons/fa'
import { Card, CardContent } from '../ui/card'
import { useBusinessInfo } from '@/contexts/contact/BusinessInfoContext'

type BusinessInfo = {
  hoursWeekdays: string
  hoursSaturday: string
  hoursSunday: string
  holidayHours: string
  emergencyServices: string
  locationName: string
  locationCity: string
  locationLat?: number
  locationLng?: number
}

const BusinessHourMap = () => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('/api/business-info')
  //       const data = await res.json()
  //       setBusinessInfo(data)
  //     } catch (err) {
  //       console.error('Failed to load business info', err)
  //     }
  //   }

  //   fetchData()
  // }, [])
    const { data } = useBusinessInfo()

  if (!businessInfo) return <p className="text-center py-20">Loading business info...</p>

  const {
    hoursWeekdays,
    hoursSaturday,
    hoursSunday,
    holidayHours,
    emergencyServices,
    locationName,
    locationCity,
    locationLat,
    locationLng,
  } = businessInfo

  const mapSrc = locationLat && locationLng
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${locationLat},${locationLng}&zoom=15&size=600x300&markers=color:red%7C${locationLat},${locationLng}&key=YOUR_GOOGLE_MAPS_API_KEY`
    : null

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">Business Hours</h2>
            <Card className="border-2 border-blue-100">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <FaClock className="text-blue-600 mr-3" />
                      <span className="font-medium">Monday - Friday</span>
                    </div>
                    <span>{hoursWeekdays}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <FaClock className="text-blue-600 mr-3" />
                      <span className="font-medium">Saturday</span>
                    </div>
                    <span>{hoursSaturday}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <FaClock className="text-blue-600 mr-3" />
                      <span className="font-medium">Sunday</span>
                    </div>
                    <span>{hoursSunday}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Holiday Hours</h3>
                  <p className="text-gray-600">{holidayHours}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Emergency Services</h3>
                  <p className="text-gray-600">{emergencyServices}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Find Us</h2>
            <Card className="border-2 border-blue-100 overflow-hidden">
              <div className="h-[300px] bg-gray-200 relative">
                {mapSrc ? (
                  <img
                    src={mapSrc}
                    alt="Office Location Map"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-center w-full pt-28 text-gray-600">No map available</p>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-3 rounded-lg shadow-lg">
                    <FaMapMarker className="text-red-500 text-2xl" />
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{locationName}</p>
                    <p className="text-sm text-gray-500">{locationCity}</p>
                  </div>
                  <Button size="sm" className="!rounded-button whitespace-nowrap">
                    <FaDirections className="mr-2" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessHourMap
