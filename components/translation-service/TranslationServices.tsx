import React from 'react'
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { FaFileAlt, FaCogs, FaBalanceScale, FaHandshake } from 'react-icons/fa';
import inPersonTranslation from "@/public/assets/images/talking.jpg"

const TranslationServices = () => {
    const translationServices = [
        {
            title: "Document Translation",
            description:
            "Professional translation of all document types with certified accuracy",
            icon: <FaFileAlt/>,
            imageUrl:
            "https://readdy.ai/api/search-image?query=Professional%20document%20translation%20service%20concept%20with%20papers%2C%20dictionaries%2C%20and%20computer%20with%20multiple%20language%20text%20visible%2C%20clean%20modern%20office%20setting%2C%20soft%20natural%20lighting%2C%20minimalist%20desk%20arrangement&width=400&height=300&seq=1&orientation=landscape",
        },
        {
            title: "Technical Translation",
            description:
            "Specialized translation for technical manuals, guides, and specifications",
            icon: <FaCogs/>,
            imageUrl:
            "https://readdy.ai/api/search-image?query=Technical%20translation%20workspace%20with%20engineering%20documents%2C%20technical%20manuals%2C%20and%20computer%20screens%20showing%20diagrams%20and%20multilingual%20technical%20content%2C%20modern%20office%20environment%2C%20professional%20setting%2C%20clean%20desk&width=400&height=300&seq=2&orientation=landscape",
        },
        {
            title: "Legal Translation",
            description:
            "Precise translation of legal documents with terminology expertise",
            icon: <FaBalanceScale/>,
            imageUrl:
            "https://readdy.ai/api/search-image?query=Legal%20translation%20workspace%20with%20law%20books%2C%20legal%20documents%2C%20scales%20of%20justice%2C%20and%20computer%20showing%20multilingual%20legal%20text%2C%20professional%20office%20setting%2C%20organized%20desk%20with%20legal%20papers%2C%20clean%20modern%20environment&width=400&height=300&seq=3&orientation=landscape",
        },
        {
            title: "In Person Translation",
            description:
            "One of our professional translators will be physically present to facilitate communication between parties who speak different languages. This will accurately interpret business meetings, legal proceedings, medical appointments, and conferences.",
            icon: <FaHandshake/>,
            imageUrl:inPersonTranslation.src,
        },
    ];
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                Our Translation Services
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a comprehensive range of translation services to meet
                your specific needs.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {translationServices.map((service, index) => (
                    <Card
                      key={index}
                      className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                        <div className="h-48 overflow-hidden">
                            <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                      <CardHeader>
                            <CardTitle className="flex items-center">
                                <i className={`text-blue-600 mr-2`}>{service.icon}</i>
                                {service.title}
                            </CardTitle>
                      </CardHeader>
                      <CardContent>
                            <p className="text-gray-600">{service.description}</p>
                      </CardContent>
                      <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full !rounded-button whitespace-nowrap"
                            >
                            Learn More
                            </Button>
                      </CardFooter>
                    </Card>
                  ))}
            </div>
        </div>
    )
}

export default TranslationServices;