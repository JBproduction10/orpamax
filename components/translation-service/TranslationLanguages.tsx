import React from 'react'

const TranslationLanguages = () => {
    return (
        <div className="bg-blue-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Languages We Support
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our team of professional translators covers a wide range of
                        languages to meet your global communication needs.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                    {[
                        "English",
                        "French",
                        "Lingala",
                        "Swahili",
                    ].map((language, index) => (
                        <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center"
                        >
                        <span className="font-medium text-gray-700">
                            {language}
                        </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TranslationLanguages;