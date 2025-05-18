'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Input } from '../ui/input';
import SocialMedia from './SocialMedia';

const SocialNewsletter = () => {
    return (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                  <p className="text-gray-600 mb-6">
                    Follow us on social media for updates, tips, and special
                    offers.
                  </p>
                  <SocialMedia/>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Stay updated with our latest services, promotions, and
                    cleaning/translation tips.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder="Enter your email address"
                      className="!rounded-button"
                    />
                    <Button className="whitespace-nowrap !rounded-button">
                      <FaEnvelope className="fas fa-envelope mr-2"/> Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    By subscribing, you agree to receive marketing emails from
                    ORPAMAX Services. You can unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default SocialNewsletter;