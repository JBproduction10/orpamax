'use client';

import { useEffect, useState } from 'react';
import { InputField, TextAreaField } from '@/components/FormFields';

export default function EditFooter() {
  const [footerId, setFooterId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [businessHour, setBusinessHour] = useState('');
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [existingLogo, setExistingLogo] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/footer')
      .then(res => res.json())
      .then(data => {
        const footer = Array.isArray(data) ? data[0] : data;
        if (!footer) return;
  
        setFooterId(footer._id);
        setCompanyName(footer.companyName || '');
        setDescription(footer.description || '');
        setLocation(footer.location || '');
        setPhone(footer.phone || '');
        setEmail(footer.email || '');
        setBusinessHour(footer.businessHour || '');
        setExistingLogo(footer.logo || null);
        setPreviewUrl(footer.logo?.secure_url || null);
      })
      .catch(err => {
        console.error('Failed to fetch footer data:', err);
      });
  }, []);
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : existingLogo?.secure_url || null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    let logoData = existingLogo;

    // Upload new logo to Cloudinary if selected
    if (logo) {
      const formData = new FormData();
      formData.append('file', logo);
      formData.append('upload_preset',"");

      const cloudRes = await fetch(`/api/admin/upload/image`, {
        method: 'POST',
        body: formData,
      });

      if (!cloudRes.ok) {
        alert('Failed to upload image');
        setIsSubmitting(false);
        return;
      }

      const data = await cloudRes.json();
      logoData = {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    }

    const res = await fetch(`/api/admin/footer/${footerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName,
        email,
        location,
        description,
        businessHour,
        phone,
        logo: logoData,
      }),
    });

    setIsSubmitting(false);
    if (res.ok) {
      alert('Footer updated!');
    } else {
      alert('Update failed.');
    }
  }

  async function handleDeleteImage() {
    if (!footerId) return;
    if (!confirm('Are you sure you want to delete the logo?')) return;

    const res = await fetch(`/api/admin/footer/${footerId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setExistingLogo(null);
      setPreviewUrl(null);
      setLogo(null);
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
          <InputField label="Company Name" value={companyName} setValue={setCompanyName} />
          <InputField label="Business Hours" value={businessHour} setValue={setBusinessHour} />
          <InputField label="Email" value={email} setValue={setEmail} />
          <InputField label="Location" value={location} setValue={setLocation} />
          <InputField label="Phone" value={phone} setValue={setPhone} />
          <TextAreaField label="Description" value={description} setValue={setDescription} />

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

          {existingLogo && !logo && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-600">Current Logo</h3>
              <img src={existingLogo.secure_url} alt="Current Logo" className="w-full max-w-md rounded-lg border mb-2" />
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
