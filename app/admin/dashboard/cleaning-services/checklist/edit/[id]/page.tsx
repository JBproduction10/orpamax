'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ChecklistSection } from '@/types/types'
import { Plus, Trash2, Save } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export default function EditChecklistSection() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [formData, setFormData] = useState<ChecklistSection | null>(null)

  useEffect(() => {
    fetch(`/api/admin/cleaning/checklist/${id}`)
      .then(res => {
        if(!res.ok){
            throw new Error('Faile to fetch checklist data')
        }
        return res.json()
      })
      .then(data => setFormData(data.item))
      .catch(error => console.error(error))
  }, [id])

  const handleChange = (field: keyof ChecklistSection, value: string | boolean) => {
    if(!formData) return
    setFormData(prev => ({ ...prev!, [field]: value}))
  }

  const handleItemChange = (index: number, value: string) => {
    if(!formData) return
    const updated = [...formData.items]
    updated[index] = value
    setFormData(prev => ({ ...prev!, items: updated}))
  }

  const addItem = () => {
    if(!formData) return
    setFormData(prev => ({ ...prev!, items: [...prev!.items, '']}))
  }

  const removeItem = (index: number) => {
    if(!formData) return
    const updated = [...formData.items]
    updated.splice(index, 1)
    setFormData(prev => ({ ...prev!, items: updated}))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/admin/cleaning/checklist/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    router.push('/admin/dashboard/cleaning-services/checklist')
  }

  if (!formData) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">✏️ Edit Checklist Section</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Section Title</Label>
          <Input
            type="text"
            value={formData.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="e.g., Kitchen, Bathroom"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Items */}
        <div className="space-y-4">
          <Label className="block text-sm font-medium text-gray-700">Checklist Items</Label>
          {formData.items.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <Input
                type="text"
                value={item}
                onChange={e => handleItemChange(idx, e.target.value)}
                placeholder={`Item ${idx + 1}`}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <Button
                variant="ghost"
                type="button"
                onClick={() => removeItem(idx)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            type="button"
            onClick={addItem}
            className="flex items-center text-blue-600 hover:underline mt-2"
          >
            <Plus size={18} className="mr-1" /> Add Item
          </Button>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition duration-200 flex items-center gap-2"
          >
            <Save size={18} /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
