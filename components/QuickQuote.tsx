import React from 'react'
import { Button } from './ui/button'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
const QuickQuote = () => {
  return (
    <div className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need a Quick Quote?
          </h2>
          <p className="text-gray-600 mb-8">
            Get a personalized quote for our translation or cleaning
            services in just a few clicks.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
          >
            <Link href="/quotes">
              Request Quote Now{" "}
            </Link>
            <FaArrowRight className="fas fa-arrow-right ml-2"/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuickQuote