'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { ChecklistSection } from '@/types/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function CreateChecklistSection() {
  const [formData, setFormData] = useState<ChecklistSection>({
    title: '',
    items: ['']
  })

  const router = useRouter()

  const handleChange = (field: keyof ChecklistSection, value: string)=>{
    setFormData(prev => ({ ...prev, [field]: value}))
  }

  const handleItemChange = (index: number, value: string) => {
    const updated = [...formData.items]
    updated[index] = value
    setFormData(prev => ({ ...prev, items: updated}))
  }

  const addItem = () => {
    setFormData(prev => ({ ...prev, items: [...prev.items, ''] }))
  }

  const removeItem = (index: number) => {
    const updated = [...formData.items]
    updated.splice(index, 1)
    setFormData(prev => ({ ...prev, items: updated}))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/cleaning/checklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) router.push('/admin/dashboard/cleaning-services/checklist')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Add New Checklist Section</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title Input */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Section Title</Label>
          <Input
            type="text"
            value={formData.title}
            onChange={e => handleChange("title", e.target.value)}
            placeholder="e.g., Kitchen, Bathroom"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Items */}
        <div className="space-y-4">
          <Label className="block text-sm font-medium text-gray-700">Checklist Items</Label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                type="text"
                value={item}
                onChange={e => handleItemChange(
                  index, e.target.value
                )}
                placeholder={`Item ${index + 1}`}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <Button
                type="button"
                variant='ghost'
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}

          <Button
            variant='outline'
            type="button"
            onClick={addItem}
            className="flex items-center text-blue-600 hover:underline mt-2"
          >
            <Plus size={18} className="mr-1" /> Add Item
          </Button>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition duration-200"
          >
            Save Checklist Section
          </Button>
        </div>
      </form>
    </div>
  )
}
