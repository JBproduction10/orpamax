'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function CreateBusinessInfo() {
  const router = useRouter()
  const [location, setLocation] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => console.error('Geolocation error:', err)
    )
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const payload = {
      hoursWeekdays: form.get('hoursWeekdays'),
      hoursSaturday: form.get('hoursSaturday'),
      hoursSunday: form.get('hoursSunday'),
      holidayHours: form.get('holidayHours'),
      emergencyServices: form.get('emergencyServices'),
      locationName: form.get('locationName'),
      locationCity: form.get('locationCity'),
      locationLat: location.lat,
      locationLng: location.lng,
    }

    await fetch('/api/admin/contact/business-info', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    router.push('/admin/dashboard/contact-us/business-info')
  }

  const mapUrl =
    location.lat && location.lng
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=600x300&markers=color:red%7C${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
      : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6"
    >
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Add Business Info</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form Fields */}
            {['Weekday Hours', 'Saturday Hours', 'Sunday Hours', 'Holiday Hours', 'Emergency Services Info', 'Location Name', 'City'].map((label, i) => {
              const name = ['hoursWeekdays', 'hoursSaturday', 'hoursSunday', 'holidayHours', 'emergencyServices', 'locationName', 'locationCity'][i]
              return (
                <div key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <Input id={name} name={name} required />
                </div>
              )
            })}

            {/* Location Preview */}
            <div className="md:col-span-2 mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Location Preview (from your current position):
              </p>
              {mapUrl ? (
                <img src={mapUrl} alt="Location preview" className="rounded-md shadow-md" />
              ) : (
                <p className="text-xs text-red-500">Unable to load map preview.</p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <Button type="submit" className="w-full md:w-auto">Save Info</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
