'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CreateContactHero() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setImagePreview(URL.createObjectURL(selected));
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        toast.error('Please select an image');
        return;
      }

      toast.loading('Creating hero...');

      const formData = new FormData();
      formData.append('file', file);

      const imageRes = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (!imageRes.ok) throw new Error('Image upload failed');

      const image = await imageRes.json();

      const res = await fetch('/api/admin/contact/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image }),
      });

      if (!res.ok) throw new Error('Failed to create hero');

      // toast.success('Hero created successfully!');
      router.push('/admin/dashboard/contact-us/hero');
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Contact Hero</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />

      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-full h-60 object-cover mb-2 rounded" />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full mb-4"
      />

      <Button onClick={handleSubmit} className="w-full">
        Create
      </Button>
    </div>
  );
}
