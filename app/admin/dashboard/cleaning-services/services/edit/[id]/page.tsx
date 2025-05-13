'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { iconOptions } from '@/lib/constants/icons';

const EditCleaningService = () => {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetch(`/api/admin/cleaning/services/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setIcon(data.icon);
      setPreviewUrl(data.imageUrl.secure_url);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedImage = data.imageUrl;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const uploadRes = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData,
      });
      updatedImage = await uploadRes.json();
    }

    await fetch(`/api/admin/cleaning/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, icon, imageUrl: updatedImage }),
    });

    router.push('/admin/dashboard/cleaning-services/services');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Edit Cleaning Service</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <Input placeholder="Enter service title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <Textarea rows={4} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          {/* Icon Selection */}
          {/* <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Select Icon</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            >
              <option value="">Choose an icon</option>
              {Object.keys(iconOptions).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div> */}

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageFile(file || null);
                setPreviewUrl(file ? URL.createObjectURL(file) : previewUrl);
              }}
            />
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Preview</label>
              <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg border" />
            </div>
          )}

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full">Update Service</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCleaningService;
