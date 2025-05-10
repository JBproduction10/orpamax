'use client';

import { useState } from 'react';
import { InputField, TextAreaField } from '@/components/FormFields';
import { toast } from 'sonner';

export default function CreateFooter() {
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [businessHour, setBusinessHour] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setCompanyName('');
    setDescription('');
    setEmail('');
    setLocation('');
    setBusinessHour('');
    setPhone('');
    setLogo(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    let logoData = null;

    if (logo) {
      const formData = new FormData();
      formData.append('file', logo);
      formData.append('upload_preset', '');

      const res = await fetch(`/api/admin/upload/image`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        toast.error('Failed to upload image');
        setIsSubmitting(false);
        return;
      }

      const data = await res.json();

      logoData = {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    }

    const res = await fetch('/api/admin/footer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName,
        email,
        businessHour,
        location,
        description,
        phone,
        logo: logoData,
      }),
    });

    setIsSubmitting(false);
    if (res.ok) {
      toast.success('Footer created successfully!');
      resetForm();
    } else {
      toast.error('Failed to create footer');
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Footer Section</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Company Name" value={companyName} setValue={setCompanyName} />
          <InputField label="Business Hours" value={businessHour} setValue={setBusinessHour} />
          <InputField label="Email" value={email} setValue={setEmail} />
          <InputField label="Location" value={location} setValue={setLocation} />
          <InputField label="Phone" value={phone} setValue={setPhone} />
          <TextAreaField label="Description" value={description} setValue={setDescription} />

          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Logo</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="max-w-md border rounded" />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {isSubmitting ? 'Submitting...' : 'Create Footer'}
          </button>
        </form>
      </div>
    </div>
  );
}
