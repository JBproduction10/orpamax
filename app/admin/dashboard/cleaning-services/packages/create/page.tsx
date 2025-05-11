'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { CleaningPackage } from '@/types/types'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const CreateCleaningPackage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<CleaningPackage>({
    title: '',
    price: '',
    description: '',
    features: [''],
    highlighted: false,
  })

  const handleChange = (field: keyof CleaningPackage, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formData.features]
    updated[index] = value
    setFormData(prev => ({ ...prev, features: updated }))
  }

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))
  }

  const removeFeature = (index: number) => {
    const updated = [...formData.features]
    updated.splice(index, 1)
    setFormData(prev => ({ ...prev, features: updated }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/cleaning/package', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) router.push('/admin/dashboard/cleaning-services/packages')
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl">Create Cleaning Package</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Basic Package"
                  value={formData.title}
                  onChange={e => handleChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  placeholder="$49.99"
                  value={formData.price}
                  onChange={e => handleChange('price', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="This package includes basic cleaning services..."
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
              />
            </div>
            <div>
              <Label>Features</Label>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Feature ${index + 1}`}
                      value={feature}
                      onChange={e => handleFeatureChange(index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addFeature} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add Feature
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="highlighted">Highlight as Most Popular</Label>
              <Switch
                id="highlighted"
                checked={formData.highlighted}
                onCheckedChange={val => handleChange('highlighted', val)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">Create Package</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default CreateCleaningPackage
