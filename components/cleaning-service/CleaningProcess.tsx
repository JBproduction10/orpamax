'use client'

import React from 'react'
import {
  FaCalendarCheck,
  FaClipboardList,
  FaSprayCan,
  FaSearch
} from 'react-icons/fa'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

// Cleaning process steps data
const processSteps = [
  {
    title: 'Book',
    description: 'Schedule your cleaning service online or by phone',
    icon: FaCalendarCheck
  },
  {
    title: 'Assess',
    description: 'We assess your space and specific cleaning requirements',
    icon: FaClipboardList
  },
  {
    title: 'Clean',
    description: 'Our professional team performs thorough cleaning',
    icon: FaSprayCan
  },
  {
    title: 'Inspect',
    description: 'Final inspection to ensure everything meets our standards',
    icon: FaSearch
  }
]

const CleaningProcess = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Cleaning Process</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We follow a systematic approach to ensure thorough and efficient
          cleaning.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {processSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card
              key={index}
              className="border-2 border-blue-100 text-center"
            >
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="text-blue-600 text-2xl" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CleaningProcess
