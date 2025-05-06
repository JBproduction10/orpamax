import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const QuoteContactForm = ({
    firstName,
    lastName,
    email,
    phone,
    company,
    address,
    city,
    state,
    zip,
    message,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setCompany,
    setAddress,
    setCity,
    setState,
    setZip,
    setMessage,
}:{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    message: string;
    setFirstName: (val: string) => void;
    setLastName: (val: string) => void;
    setEmail: (val: string) => void;
    setPhone: (val: string) => void;
    setCompany: (val: string) => void;
    setAddress: (val: string) => void;
    setCity: (val: string) => void;
    setState: (val: string) => void;
    setZip: (val: string) => void;
    setMessage: (val: string) => void;
}) => {
    return (
        <>
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="firstName">First Name</label>
                    <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="rounded-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="lastName">Last Name</label>
                    <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="rounded-full"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="rounded-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone">Phone</label>
                    <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="rounded-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="company">Company (Optional)</label>
                <Input
                    id="company"
                    placeholder="Enter your company name"
                    className="rounded-full"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="address">Address</label>
                <Input
                    id="address"
                    placeholder="Enter your address"
                    className="rounded-full"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label htmlFor="city">City</label>
                    <Input
                    id="city"
                    placeholder="City"
                    className="rounded-full"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="state">State/Province</label>
                    <Input
                    id="state"
                    placeholder="State/Province"
                    className="rounded-full"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="zip">Zip/Postal Code</label>
                    <Input
                    id="zip"
                    placeholder="Zip/Postal Code"
                    className="rounded-full"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message">Additional Information</label>
                <Textarea
                    id="message"
                    placeholder="Any specific requirements or questions"
                    className="min-h-[100px] rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
        </>
    )
}

export default QuoteContactForm;