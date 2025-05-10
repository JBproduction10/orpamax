import React from 'react'
import {
  FaUtensils,
  FaBath,
  FaCouch,
  FaBed,
  FaCheck
} from 'react-icons/fa'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../ui/card'

const checklistData = [
  {
    title: 'Kitchen',
    icon: <FaUtensils className="text-blue-600 mr-2" />,
    items: [
      'Clean and sanitize countertops and backsplash',
      'Clean exterior of appliances',
      'Clean and shine sink and fixtures',
      'Clean microwave interior and exterior',
      'Wipe cabinet doors and handles',
      'Sweep and mop floors'
    ]
  },
  {
    title: 'Bathroom',
    icon: <FaBath className="text-blue-600 mr-2" />,
    items: [
      'Clean and sanitize toilet, tub, and shower',
      'Clean and shine sink and fixtures',
      'Clean mirrors and glass surfaces',
      'Wipe cabinet doors and handles',
      'Empty trash and replace liners',
      'Sweep and mop floors'
    ]
  },
  {
    title: 'Living Areas',
    icon: <FaCouch className="text-blue-600 mr-2" />,
    items: [
      'Dust all accessible surfaces',
      'Wipe down tables and visible surfaces',
      'Vacuum carpets and rugs',
      'Sweep and mop hard floors',
      'Empty trash and replace liners',
      'Clean door handles and light switches'
    ]
  },
  {
    title: 'Bedrooms',
    icon: <FaBed className="text-blue-600 mr-2" />,
    items: [
      'Dust all accessible surfaces',
      'Wipe down nightstands and dressers',
      'Change linens (upon request)',
      'Vacuum carpets and rugs',
      'Sweep and mop hard floors',
      'Empty trash and replace liners'
    ]
  }
]

const CleaningChecklist = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Cleaning Checklist</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here's what our standard cleaning service includes for each area of your home or office.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {checklistData.map((section, idx) => (
            <Card key={idx} className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CleaningChecklist
