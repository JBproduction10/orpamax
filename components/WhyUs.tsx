import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { FaAward, FaClock, FaThumbsUp } from 'react-icons/fa'

const WhyUs = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Why Choose ORPAMAX
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We combine language expertise with cleaning excellence to
          provide comprehensive services.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="border-2 border-blue-100">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FaAward className="fas fa-award text-blue-600 text-2xl"/>
            </div>
            <CardTitle>Certified Professionals</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Our team consists of certified translators and trained
              cleaning professionals with years of experience.
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-100">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FaClock className="fas fa-clock text-blue-600 text-2xl"/>
            </div>
            <CardTitle>Timely Delivery</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              We understand the importance of deadlines and always
              deliver our services on time, every time.
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-100">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FaThumbsUp className="fas fa-thumbs-up text-blue-600 text-2xl"/>
            </div>
            <CardTitle>Satisfaction Guaranteed</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              We're not satisfied until you are. Our services come with
              a 100% satisfaction guarantee.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WhyUs