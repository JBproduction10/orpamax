'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type BusinessHour = { day: string; open: string; close: string }
type Location = { address: string; city: string; state: string; lat: number; lng: number }

type BusinessInfo = {
  _id: string
  hours: BusinessHour[]
  holidayHours: string
  emergencyMessage: string
  location?: Location
}

const fetcher = (url: string): Promise<BusinessInfo[]> =>
  fetch(url).then(res => res.json())

export default function BusinessInfoList() {
  const { data, mutate, isLoading } = useSWR<BusinessInfo[]>('/api/admin/contact/business-info', fetcher)

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/contact/business-info/${id}`, { method: 'DELETE' })
    mutate()
  }

  const validData = data?.filter(
    item => item.location?.address && item.location?.city && item.hours.length > 0
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Business Info</h1>
        <Link href="/admin/dashboard/contact-us/business-info/create">
          <Button>Add New</Button>
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      )}

      {validData?.length === 0 && (
        <p className="text-muted-foreground text-center mt-10">No valid business entries found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validData?.map(item => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle className="text-lg">{item.location!.address}, {item.location!.city}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Open Days:</strong> {item.hours.length}</p>
              <div className="flex gap-2">
                <Link href={`/admin/dashboard/contact-us/business-info/edit/${item._id}`}>
                  <Button size="sm">Edit</Button>
                </Link>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
