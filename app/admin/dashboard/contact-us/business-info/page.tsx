// app/(dashboard)/admin/dashboard/contact-us/business-info/page.tsx
"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function BusinessInfoList() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/contact/business-info")
        setData(res.data)
      } catch (error) {
        toast.error("Failed to fetch business info.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/admin/contact/business-info/${id}`)
      setData(data.filter(item => item._id !== id))
      toast.success("Business info deleted.")
    } catch (error) {
      toast.error("Delete failed.")
    }
  }

  if (loading) {
    return <Loader2 className="animate-spin" />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data.map(item => (
        <Card key={item._id}>
          <CardContent className="p-4 space-y-4">
            {item.location?.lat && item.location?.lng && (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${item.location.lat},${item.location.lng}&zoom=14&size=600x300&markers=color:red%7C${item.location.lat},${item.location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
                alt="Map preview"
                className="w-full rounded-lg"
              />
            )}
            <p><strong>Open Days:</strong> {item.hours.length}</p>
            <div className="flex gap-2">
              <Link href={`/admin/dashboard/contact-us/business-info/edit/${item._id}`}>
                <Button size="sm">Edit</Button>
              </Link>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
