'use client'
import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CleaningPackage } from '@/types/types'

export default function PackageForm({ mode, packageId }: { mode: 'create' | 'edit', packageId?: string }) {
  const [formData, setFormData] = useState<CleaningPackage>({ title: '', price: '', description: '', features: [''], highlighted: false })
  const router = useRouter()

  useEffect(() => {
    if (mode === 'edit' && packageId) {
      fetch(`/api/admin/packages/${packageId}`)
        .then(res => res.json())
        .then(data => setFormData(data.package))
    }
  }, [mode, packageId])

  const handleChange = (field: keyof CleaningPackage, value: string | boolean) => setFormData(prev => ({ ...prev, [field]: value }))

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formData.features]
    updated[index] = value
    setFormData(prev => ({ ...prev, features: updated }))
  }

  const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))
  const removeFeature = (index: number) => setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const endpoint = mode === 'edit' ? `/api/admin/packages/${packageId}` : '/api/admin/packages'
    const method = mode === 'edit' ? 'PUT' : 'POST'

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    router.push('/admin/packages')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{mode === 'edit' ? 'Update Package' : 'Create Package'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" className="input w-full" value={formData.title} onChange={e => handleChange('title', e.target.value)} />
        <input type="text" placeholder="Price" className="input w-full" value={formData.price} onChange={e => handleChange('price', e.target.value)} />
        <textarea placeholder="Description" className="textarea w-full" value={formData.description} onChange={e => handleChange('description', e.target.value)} />
        <div>
          <label className="block font-medium mb-2">Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="text" className="input w-full" value={feature} onChange={e => handleFeatureChange(index, e.target.value)} />
              <Button type="button" onClick={() => removeFeature(index)} variant="destructive" className="ml-2">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={addFeature} className="mt-2">Add Feature</Button>
        </div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={formData.highlighted} onChange={e => handleChange('highlighted', e.target.checked)} />
          <span>Highlighted</span>
        </label>
        <Button type="submit">{mode === 'edit' ? 'Update' : 'Create'} Package</Button>
      </form>
    </div>
  )
}