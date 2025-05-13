'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type ServiceFormData = {
  title: string;
  description: string;
  slug: string;
  features: string;
  icon: string;
  file: File | null;
};

export default function CreateService() {
  const [data, setData] = useState<ServiceFormData>({
    title: '',
    description: '',
    slug: '',
    features: '',
    icon: '',
    file: null,
  });

  const router = useRouter();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', data.file!);
    const res = await fetch('/api/admin/upload/image', {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const image = await handleUpload();

    const payload = {
      ...data,
      features: data.features.split(',').map(f => f.trim()),
      imageUrl: image.secure_url,
      imagePublicId: image.public_id,
    };

    await fetch('/api/admin/home/services', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    router.push('/admin/dashboard/home/home-services');
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-lg">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-6">Create New Service</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Title</Label>
            <Input
              value={data.title}
              onChange={e => setData({ ...data, title: e.target.value })}
              placeholder="e.g. Deep Cleaning"
            />
          </div>

          <div>
            <Label>Slug</Label>
            <Input
              value={data.slug}
              onChange={e => setData({ ...data, slug: e.target.value })}
              placeholder="e.g.translation-services or cleaning-services. The slug can only be those 2 e.g"
            />
          </div>

          {/* <div>
            <Label>Icon</Label>
            <Input
              value={data.icon}
              onChange={e => setData({ ...data, icon: e.target.value })}
              placeholder="e.g. FaBroom"
            />
          </div> */}

          <div>
            <Label>Description</Label>
            <Textarea
              value={data.description}
              onChange={e => setData({ ...data, description: e.target.value })}
              placeholder="Service description..."
            />
          </div>

          <div>
            <Label>Features</Label>
            <Textarea
              value={data.features}
              onChange={e => setData({ ...data, features: e.target.value })}
              placeholder="Comma-separated (e.g. Kitchen, Bathroom)"
            />
          </div>

          <div>
            <Label>Upload Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={e => setData({ ...data, file: e.target.files?.[0] || null })}
            />
            {data.file && (
              <img
                src={URL.createObjectURL(data.file)}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          <Button type="submit" className="w-full mt-4">
            Create Service
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
