'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

export default function EditFooter() {
  const [footer, setFooter] = useState<any>(null);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [businessHour, setBusinessHour] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/home/footer')
      .then(res => res.json())
      .then(data => {
        setFooter(data);
        setCompanyName(data.companyName || '');
        setDescription(data.description || '');
        setLocation(data.location || '');
        setEmail(data.email || '');
        setBusinessHour(data.businessHour || '');
        setPreviewUrl(data.logo?.url || null);
      });
  }, []);

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
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || '');

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      logoData = await res.json();
    }

    await fetch('/api/home/footer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName,
        email,
        businessHour,
        location,
        description,
        logo: logoData
          ? { url: logoData.secure_url, publicId: logoData.public_id }
          : footer.logo,
      }),
    });

    alert('Footer section updated!');
    setIsSubmitting(false);
  }

  async function handleDeleteImage() {
    if (!confirm('Are you sure you want to delete the logo?')) return;

    const res = await fetch('/api/home/footer', { method: 'DELETE' });

    if (res.ok) {
      setFooter((prev: any) => ({ ...prev, logo: null }));
      setPreviewUrl(null);
      alert('Logo deleted!');
    } else {
      alert('Failed to delete logo.');
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Footer Section</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fields */}
            <InputField label="Company Name" value={companyName} setValue={setCompanyName} />
            <InputField label="Business Hours" value={businessHour} setValue={setBusinessHour} />
            <InputField label="Email" value={email} setValue={setEmail} />
            <InputField label="Location" value={location} setValue={setLocation} />
            <TextAreaField label="Description" value={description} setValue={setDescription} />
          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {previewUrl && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-600">Logo Preview</h3>
              <img src={previewUrl} alt="Preview" className="w-full max-w-md rounded-lg border shadow-sm" />
            </div>
          )}

          {footer?.logo?.url && !previewUrl && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-600">Current Logo</h3>
              <img src={footer.logo.url} alt="Current Logo" className="w-full max-w-md rounded-lg border mb-2" />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="text-red-600 text-sm hover:underline"
              >
                Delete current logo
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Footer'}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) {
    return (
      <div>
        <label className="block mb-2 font-medium text-gray-700">{label}</label>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={label}
          required
        />
      </div>
    );
  }
  
  function TextAreaField({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) {
    return (
      <div>
        <label className="block mb-2 font-medium text-gray-700">{label}</label>
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={label}
          required
        />
      </div>
    );
  }
  
