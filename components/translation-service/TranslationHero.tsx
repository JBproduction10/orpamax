import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const TranslationHero = () => {
    return (
        <div className="relative h-[700px] overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"
                style={{
                backgroundImage: `url('/assets/flags.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            ></div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Professional Translation Services
                    </h1>
                    <p className="text-xl mb-8">
                        Breaking language barriers with precision and cultural
                        sensitivity. Our expert translators deliver accurate
                        translations across multiple industries.
                    </p>
                    <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
                    >
                        <Link href="/quotes">Get a Translation Quote</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TranslationHero;