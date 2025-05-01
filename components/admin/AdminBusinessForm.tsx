// components/AdminBusinessForm.tsx

'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

type BusinessInfo = {
  hoursWeekdays: string
  hoursSaturday: string
  hoursSunday: string
  holidayHours: string
  emergencyServices: string
  locationName: string
  locationCity: string
}

export default function AdminBusinessForm() {
    const { register, handleSubmit, reset, watch } = useForm<BusinessInfo>()
    const [loading, setLoading] = useState(false)
    const [coordinates, setCoordinates] = useState<{ lat: number, lng: number } | null>(null)
    const [geoLoading, setGeoLoading] = useState(false)

    useEffect(() => {
        // Fetch current business info
        const fetchData = async () => {
            try {
                const res = await fetch('/api/business-info')
                const data = await res.json()
                reset(data) // populate form
            } catch (error) {
                console.error('Failed to load business info', error)
            }
        }

        fetchData()
    }, [reset]);

    const fetchCoordinates = async (address: string) => {
        setGeoLoading(true)
        try {
          const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_MAPS_API_KEY`)
          const data = await res.json()
      
          if (data.status === 'OK') {
            const location = data.results[0].geometry.location
            setCoordinates(location)
            alert(`Location found: ${location.lat}, ${location.lng}`)
          } else {
            console.error(data)
            alert('Unable to find location')
          }
        } catch (error) {
          console.error('Geocoding error', error)
          alert('Error fetching location')
        } finally {
          setGeoLoading(false)
        }
      }

    const onSubmit = async (data: BusinessInfo) => {
        setLoading(true)
        try {
            const res = await fetch('/api/business-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
        })

        if (!res.ok) throw new Error('Failed to update')
            alert('Business info updated!')
        } catch (err) {
            console.error(err)
            alert('Update failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold">Edit Business Info</h2>

            <div>
                <label className="block mb-1 font-medium">Weekday Hours</label>
                <input {...register('hoursWeekdays')} className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
                <label className="block mb-1 font-medium">Saturday Hours</label>
                <input {...register('hoursSaturday')} className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
                <label className="block mb-1 font-medium">Sunday Hours</label>
                <input {...register('hoursSunday')} className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
                <label className="block mb-1 font-medium">Holiday Hours Info</label>
                <textarea {...register('holidayHours')} className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
                <label className="block mb-1 font-medium">Emergency Services Info</label>
                <textarea {...register('emergencyServices')} className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
                <label className="block mb-1 font-medium">Location Name</label>
                <input {...register('locationName')} className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
                <label className="block mb-1 font-medium">Location City</label>
                <input {...register('locationCity')} className="w-full border px-3 py-2 rounded" />
            </div>
            <Button
                type="button"
                onClick={() => fetchCoordinates(`${watch('locationName')}, ${watch('locationCity')}`)}
                className="mt-2"
                disabled={geoLoading}
                >
                    {geoLoading ? 'Looking up...' : 'Get Coordinates from Google'}
                </Button>

            <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
            </Button>
        </form>
    )
}
