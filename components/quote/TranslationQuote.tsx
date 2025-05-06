import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';


const TranslationQuote = ({
    languageTo,
    setLanguageTo,
    languageFrom,
    setLanguageFrom,
    documentType,
    setDocumentType,
    urgency,
    setUrgency,
    wordCount,
    setWordCount
}:{
    languageTo: string;
    setLanguageTo: (val: string) => void;
    languageFrom: string;
    setLanguageFrom: (val: string) => void;
    documentType: string;
    setDocumentType: (val: string) => void;
    urgency: string;
    setUrgency: (val: string) => void;
    wordCount: string;
    setWordCount: (val: string) => void;
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="languageFrom">From Language</label>
                    <Select
                        value={languageFrom}
                        onValueChange={setLanguageFrom}
                    >
                        <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="swahili">Swahili</SelectItem>
                            <SelectItem value="lingala">Lingala</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label htmlFor="languageTo">To Language</label>
                    <Select
                        value={languageTo}
                        onValueChange={setLanguageTo}
                    >
                        <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="swahili">Swahili</SelectItem>
                            <SelectItem value="lingala">Lingala</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="documentType">Document Type Or Interpretation</label>
                <Select
                    value={documentType}
                    onValueChange={setDocumentType}
                >
                    <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="general">General Document</SelectItem>
                        <SelectItem value="technical">Technical Document</SelectItem>
                        <SelectItem value="legal">Legal Document</SelectItem>
                        <SelectItem value="medical">Medical Document</SelectItem>
                        <SelectItem value="interpretation">Interpretation</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label htmlFor="wordCount">Word Count (Approximate)</label>
                <Input
                    type="number"
                    id="wordCount"
                    placeholder="Enter number of words"
                    className="rounded-full"
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                    // required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="urgency">Delivery Time</label>
                <Select
                    value={urgency}
                    onValueChange={setUrgency}
                >
                    <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="standard">Standard (3-5 business days)</SelectItem>
                        <SelectItem value="express">Express (1-2 business days)</SelectItem>
                        <SelectItem value="urgent">Urgent (24 hours)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default TranslationQuote;