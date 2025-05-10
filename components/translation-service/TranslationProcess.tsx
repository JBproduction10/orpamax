import React from 'react'
import { FaFileUpload, FaSearch, FaLanguage, FaCheckDouble } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const TranslationProcess = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                    Our Translation Process
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We follow a rigorous process to ensure the highest quality
                    translations.
                </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                    {
                        title: "Request",
                        description:
                        "Submit your documents and requirements through our easy quote form",
                        icon: <FaFileUpload/>,
                    },
                    {
                        title: "Analysis",
                        description:
                        "Our team analyzes your content and assigns the most suitable translator",
                        icon: <FaSearch/>,
                    },
                    {
                        title: "Translation",
                        description:
                        "Professional translation with attention to context and terminology",
                        icon: <FaLanguage/>,
                    },
                    {
                        title: "Quality Check",
                        description:
                        "Thorough review and quality assurance before final delivery",
                        icon: <FaCheckDouble/>,
                    },
                ].map((step, index) => (
                    <Card
                        key={index}
                        className="border-2 border-blue-100 text-center"
                    >
                        <CardHeader>
                            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <i
                                    className={` text-blue-600 text-2xl`}
                                >{step.icon}</i>
                            </div>
                            <CardTitle>{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default TranslationProcess;