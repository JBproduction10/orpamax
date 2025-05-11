'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { iconOptions } from '@/lib/constants/icons';
import { Label } from '@/components/ui/label';

const CreateTranslationService = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !icon || !imageFile) {
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

      const res = await fetch('/api/admin/translation/services', {
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
      router.push('/admin/dashboard/translation-services/services');
    } catch (err: any) {
      setErrors([err.message]);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Translation Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Legal Translation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe this translation service"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            >
              <option value="">Select an icon</option>
              {Object.keys(iconOptions).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageFile(file || null);
                setPreviewUrl(file ? URL.createObjectURL(file) : '');
              }}
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

export default CreateTranslationService;
