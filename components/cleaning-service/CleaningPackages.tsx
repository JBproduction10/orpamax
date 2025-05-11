'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../ui/card'

import { CleaningPackage } from '@/types/types'

// All package data mapped here
// const packages = [
//   {
//     title: 'Standard Clean',
//     price: '$120',
//     description: 'Perfect for regular maintenance cleaning',
//     features: [
//       'Dusting and vacuuming',
//       'Kitchen and bathroom cleaning',
//       'Floor mopping',
//       'Trash removal',
//       'Surface wiping'
//     ]
//   },
//   {
//     title: 'Deep Clean',
//     price: '$220',
//     description: 'Thorough cleaning of all areas and surfaces',
//     features: [
//       'All Standard Clean services',
//       'Inside cabinet cleaning',
//       'Baseboard and vent cleaning',
//       'Window sill cleaning',
//       'Appliance cleaning',
//       'Light fixture dusting'
//     ],
//     highlighted: true
//   },
//   {
//     title: 'Move-In/Out Clean',
//     price: '$320',
//     description: 'Comprehensive cleaning for property transitions',
//     features: [
//       'All Deep Clean services',
//       'Inside oven and refrigerator',
//       'Inside window cleaning',
//       'Wall spot cleaning',
//       'Cabinet deep cleaning',
//       'Fixture descaling'
//     ]
//   }
// ]

const CleaningPackages = () => {
  const [packages, setPackages] = useState<CleaningPackage[]>([])

  useEffect(() => {
    fetch('/api/cleaning/packages')
      .then(res => res.json())
      .then(data => setPackages(data.packages))
  }, [])

  return (
    <div className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Cleaning Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect cleaning package to suit your needs and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`border-2 ${pkg.highlighted ? 'border-blue-500 shadow-lg' : 'border-blue-100'}`}
            >
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

              <CardFooter>
                <Button
                  className={`w-full whitespace-nowrap rounded-lg ${
                    pkg.highlighted ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
                  }`}
                >
                  <Link href="/quotes" className="w-full text-center">
                    Book Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CleaningPackages
