'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { CleaningPackage } from '@/types/types'
import { useRouter } from 'next/navigation'

const ListCleaningPackages = () => {
  const [packages, setPackages] = useState<CleaningPackage[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/cleaning/packages')
      .then(res => res.json())
      .then(data => setPackages(data.packages))
  }, [])

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/cleaning/package/${id}`, { method: 'DELETE' })
    setPackages(prev => prev.filter(pkg => pkg._id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">All Packages</h2>
        <Button onClick={() => router.push('/admin/dashboard/cleaning-services/packages/create')}>Create New</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg._id} className={`border-2 ${pkg.highlighted ? 'border-blue-500 shadow-lg' : 'border-blue-100'}`}>
            {pkg.highlighted && (
              <div className="bg-blue-500 text-white text-center py-2">
                <p className="font-medium">Most Popular</p>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl text-center">{pkg.title}</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold text-blue-600">{pkg.price}</span>
                <span className="text-gray-500"> / visit</span>
              </div>
              <CardDescription className="text-center">{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={() => router.push(`/admin/dashboard/cleaning-services/packages/edit/${pkg._id}`)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(pkg._id!)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ListCleaningPackages
