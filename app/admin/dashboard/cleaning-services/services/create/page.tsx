'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner'; // ✅ Sonner toast

const CreateCleaningService = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imageFile) {
      setErrors(['All fields are required']);
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile!);

    try {
      const uploadRes = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData,
      });
      const imageData = await uploadRes.json();

      const res = await fetch('/api/admin/cleaning/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          icon,
          imageUrl: imageData,
        }),
      });

      if (!res.ok) throw new Error('Creation failed');
      router.push('/admin/dashboard/cleaning-services/services');
    } catch (err: any) {
      setErrors([err.message]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      setImageFile(null);
      setPreviewUrl('');
      return;
    }

    setImageFile(file || null);
    setPreviewUrl(file ? URL.createObjectURL(file) : '');
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Cleaning Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Residential Cleaning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe this cleaning service"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border"
              />
            )}
          </div>

          {errors.length > 0 && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-md">
              {errors.map((err, i) => (
                <div key={i}>• {err}</div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full">Create Service</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCleaningService;
