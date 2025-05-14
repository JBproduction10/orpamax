'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaClock, FaMapMarker } from 'react-icons/fa';
import axios from 'axios';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const MyMap = ({ center }: { center: { lat: number, lng: number } }) => (
  <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
    >
      <Marker position={center} />
    </GoogleMap>
  </LoadScript>
);

const UpdateBusinessInfoPage = () => {
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    hours: {
      mondayToFriday: '',
      saturday: '',
      sunday: '',
      holidayHours: '',
      emergencyServices: '',
    },
    location: {
      address: '',
      mapImage: '',
    },
  });

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const response = await axios.get('/api/admin/contact/business-info');
      setBusinessInfo(response.data);
      setFormData(response.data);
    };
    fetchBusinessInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.put('/api/business-info/update', formData);
    alert(response.data.message);
  };

  if (!businessInfo) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="text-3xl font-bold mb-6">Update Business Info</h2>

      {/* Business Hours Fields */}
      <div className="space-y-4">
        <label>
          Monday - Friday:
          <input
            type="text"
            name="hours.mondayToFriday"
            value={formData.hours.mondayToFriday}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label>
          Saturday:
          <input
            type="text"
            name="hours.saturday"
            value={formData.hours.saturday}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label>
          Sunday:
          <input
            type="text"
            name="hours.sunday"
            value={formData.hours.sunday}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label>
          Holiday Hours:
          <input
            type="text"
            name="hours.holidayHours"
            value={formData.hours.holidayHours}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label>
          Emergency Services:
          <input
            type="text"
            name="hours.emergencyServices"
            value={formData.hours.emergencyServices}
            onChange={handleChange}
            className="input"
          />
        </label>
      </div>

      {/* Location Fields */}
      <div className="space-y-4 mt-6">
        <label>
          Address:
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label>
          Map Image URL:
          <input
            type="text"
            name="location.mapImage"
            value={formData.location.mapImage}
            onChange={handleChange}
            className="input"
          />
        </label>
      </div>

      <Button type="submit" className="mt-6">Save Changes</Button>
    </form>
  );
};

export default UpdateBusinessInfoPage;
