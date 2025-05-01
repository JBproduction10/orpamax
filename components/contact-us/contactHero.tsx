import React from 'react'
import { Button } from '@/components/ui/button';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const contactHero = () => {
    return (
        <div className="relative h-[600px] overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/70"
                style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20contact%20center%20with%20modern%20office%20environment%20featuring%20blue%20color%20scheme%2C%20customer%20service%20representatives%20at%20workstations%20with%20headsets%2C%20large%20windows%20with%20city%20view%2C%20plants%20and%20comfortable%20seating%20area%20for%20visitors%2C%20clean%20organized%20reception%20desk%20with%20company%20logo%20displayed%20prominently&width=1440&height=400&seq=20&orientation=landscape')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-2xl text-black">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl mb-8">
                        We're here to help with all your translation and cleaning needs.
                        Reach out to our team for personalized service and support.
                    </p>
                    <div className="flex flex-wrap gap-4">
                    <Button
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-blue-50 !rounded-button whitespace-nowrap"
                    >
                        <FaPhone className="fas fa-phone-alt mr-2"/>Call Us
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-gray-200 border-white text-blue-500 hover:bg-white/10 !rounded-button whitespace-nowrap"
                    >
                        <FaEnvelope className="fas fa-envelope mr-2"/> Email Us
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default contactHero;