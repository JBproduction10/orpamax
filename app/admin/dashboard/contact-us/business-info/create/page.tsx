'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function CreateBusinessInfo() {
  const [form, setForm] = useState({
    location: { address: '', city: '', state: '', lat: '', lng: '' },
    hours: [
      { day: 'Monday - Friday', open: '', close: '' },
      { day: 'Saturday', open: '', close: '' },
      { day: 'Sunday', open: '', close: '' },
    ],
    holidayHours: '',
    emergencyMessage: '',
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      location: { ...prev.location, [name]: value }
    }))
  }

  const handleHourChange = (index: number, field: 'open' | 'close', value: string) => {
    const newHours = [...form.hours]
    newHours[index] = { ...newHours[index], [field]: value }
    setForm(prev => ({ ...prev, hours: newHours }))
  }

  const handleSubmit = async () => {
    await fetch('/api/admin/contact/business-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/admin/dashboard/contact-us/business-info')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h1 className="text-2xl font-semibold">Create Business Info</h1>

          <div>
            <Label>Address</Label>
            <Input name="address" onChange={handleChange} placeholder="123 Main St" />
          </div>
          <div>
            <Label>City</Label>
            <Input name="city" onChange={handleChange} />
          </div>
          <div>
            <Label>State</Label>
            <Input name="state" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Latitude</Label>
              <Input name="lat" onChange={handleChange} />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input name="lng" onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label>Business Hours</Label>
            {form.hours.map((hour, index) => (
              <div key={hour.day} className="mb-4">
                <p className="font-medium">{hour.day}</p>
                <div className="grid grid-cols-2 gap-2 max-w-xs">
                  <Input
                    placeholder="Open"
                    value={hour.open}
                    onChange={e => handleHourChange(index, 'open', e.target.value)}
                  />
                  <Input
                    placeholder="Close"
                    value={hour.close}
                    onChange={e => handleHourChange(index, 'close', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <Label>Holiday Hours</Label>
            <Textarea name="holidayHours" onChange={e => setForm(f => ({ ...f, holidayHours: e.target.value }))} />
          </div>

          <div>
            <Label>Emergency Message</Label>
            <Textarea name="emergencyMessage" onChange={e => setForm(f => ({ ...f, emergencyMessage: e.target.value }))} />
          </div>

          <Button onClick={handleSubmit}>Create</Button>
        </CardContent>
      </Card>
    </div>
  )
}
