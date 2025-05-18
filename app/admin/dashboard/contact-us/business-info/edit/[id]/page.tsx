'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import useSWR from 'swr'

type BusinessHour = { day: string; open: string; close: string }
type Location = { address: string; city: string; state: string; lat: number; lng: number }

type BusinessInfo = {
  _id: string
  hours: BusinessHour[]
  holidayHours: string
  emergencyMessage: string
  location: Location
}

const fetcher = (url: string): Promise<BusinessInfo> =>
  fetch(url).then(res => res.json())

export default function EditBusinessInfoPage() {
  const { id } = useParams()
  const router = useRouter()

  const { data, isLoading } = useSWR<BusinessInfo>(id ? `/api/admin/contact/business-info/${id}` : null, fetcher)

  const [form, setForm] = useState<BusinessInfo | null>(null)

  useEffect(() => {
    if (data) {
      // Ensure hours have Mon-Fri, Sat, Sun
      const defaultHours = [
        { day: 'Monday - Friday', open: '', close: '' },
        { day: 'Saturday', open: '', close: '' },
        { day: 'Sunday', open: '', close: '' },
      ]
      // Merge existing hours into defaultHours by day
      const mergedHours = defaultHours.map(defHour => {
        const found = data.hours.find(h => h.day === defHour.day)
        return found || defHour
      })
      setForm({ ...data, hours: mergedHours })
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (!form) return
    if (name.startsWith('location.')) {
      const key = name.split('.')[1]
      setForm({ ...form, location: { ...form.location, [key]: value } })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleHourChange = (index: number, field: keyof BusinessHour, value: string) => {
    if (!form) return
    const newHours = [...form.hours]
    newHours[index] = { ...newHours[index], [field]: value }
    setForm({ ...form, hours: newHours })
  }

  const handleSubmit = async () => {
    await fetch(`/api/admin/contact/business-info/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/admin/dashboard/contact-us/business-info')
  }

  if (isLoading || !form) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-2">Edit Business Info</h1>

      <div>
        <Label>Address</Label>
        <Input name="location.address" value={form.location.address} onChange={handleChange} />
      </div>
      <div>
        <Label>City</Label>
        <Input name="location.city" value={form.location.city} onChange={handleChange} />
      </div>
      <div>
        <Label>State</Label>
        <Input name="location.state" value={form.location.state} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Latitude</Label>
          <Input name="location.lat" value={form.location.lat} onChange={handleChange} />
        </div>
        <div>
          <Label>Longitude</Label>
          <Input name="location.lng" value={form.location.lng} onChange={handleChange} />
        </div>
      </div>

      <div>
        <Label>Business Hours</Label>
        {form.hours.map((hour, i) => (
          <div key={hour.day} className="mb-4">
            <p className="font-medium">{hour.day}</p>
            <div className="grid grid-cols-2 gap-2 max-w-xs">
              <Input
                placeholder="Open"
                value={hour.open}
                onChange={e => handleHourChange(i, 'open', e.target.value)}
              />
              <Input
                placeholder="Close"
                value={hour.close}
                onChange={e => handleHourChange(i, 'close', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <Label>Holiday Hours</Label>
        <Textarea name="holidayHours" value={form.holidayHours} onChange={handleChange} />
      </div>

      <div>
        <Label>Emergency Message</Label>
        <Textarea name="emergencyMessage" value={form.emergencyMessage} onChange={handleChange} />
      </div>

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
