'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  const [footer, setFooter] = useState({
    companyName: "", 
    logo: "",
    businessHour: "",
    location: '',
    description: '',
    email: ''
  });
  const [existingContent, setExistingContent] = useState(null);

  useEffect(() => {
    fetch("/api/home/footer")
      .then(res => res.json())
      .then(data => {
        if(data){
          setFooter(data);
          setExistingContent(data);
        }
      })
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/orpamax/fulllogo_transparent.png"
                  alt="Company Logo"
                  width={200}
                  height={200}
                  quality={100}
                />

                <h3 className="text-xl font-bold">{footer.companyName}</h3>
              </div>
              <p className="text-blue-200 mb-4">
                {footer.description}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="text-blue-200 hover:text-white transition-colors p-0 h-auto font-normal"
                  >
                    Translation Services
                  </Button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Document Translation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                   
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Cleaning Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Residential Cleaning
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Commercial Cleaning
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="fas fa-map-marker-alt mt-1 mr-2 text-blue-300"/>
                  <span>
                    {footer.location}
                  </span>
                </li>
                {/* <li className="flex items-center">
                  <FaPhoneAlt className="fas fa-phone-alt mr-2 text-blue-300"/>
                  <span></span>
                </li> */}
                <li className="flex items-center">
                  <FaEnvelope className="fas fa-envelope mr-2 text-blue-300"/>
                  <span>{footer.email}</span>
                </li>
                <li className="flex items-center">
                  <FaClock className="fas fa-clock mr-2 text-blue-300"/>
                  <span>{footer.businessHour}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-300 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} {footer.companyName} LLC. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <i className="fab fa-cc-visa text-2xl text-blue-300"></i>
              <i className="fab fa-cc-mastercard text-2xl text-blue-300"></i>
              <i className="fab fa-cc-amex text-2xl text-blue-300"></i>
              <i className="fab fa-cc-paypal text-2xl text-blue-300"></i>
              <i className="fab fa-cc-apple-pay text-2xl text-blue-300"></i>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer;