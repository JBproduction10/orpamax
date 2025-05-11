'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChecklistSection } from '@/types/types'
import { Trash2, Pencil, PlusCircle } from 'lucide-react'

export default function ChecklistList() {
  const [sections, setSections] = useState<ChecklistSection[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/cleaning/checklist')
      .then(res => res.json())
      .then((data: ChecklistSection[]) => {
        const cleaned = data.map(section => ({
          ...section,
          items: Array.isArray(section.items) ? section.items : []
        }))
        setSections(cleaned)
      })
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this section?')
    if (!confirmed) return

    await fetch(`/api/admin/cleaning/checklist/${id}`, { method: 'DELETE' })
    setSections(prev => prev.filter(s => s._id !== id))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cleaning Checklist</h1>
        <Link
          href="/admin/dashboard/cleaning-services/checklist/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} /> Add Section
        </Link>
      </div>

      {sections.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No checklist sections available.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map(section => (
            <div key={section._id} className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    {(section.items || []).map((item, idx) => (
                      <li key={idx} className="pl-1">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 items-start">
                  <Link
                    href={`/admin/dashboard/cleaning-services/checklist/edit/${section._id}`}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(section._id!)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
