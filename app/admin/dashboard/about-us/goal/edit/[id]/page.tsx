'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function EditGoal() {
  const { id } = useParams();
  const router = useRouter();
  const [goal, setGoal] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/about/about-goal/${id}`)
      .then(res => res.json())
      .then(setGoal);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedImage = goal.imageUrl;

    if (file) {
      // Delete old image
      await fetch('/api/admin/delete/image', {
        method: 'POST',
        body: JSON.stringify({ public_id: goal.imageUrl.public_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Upload new image
      const formData = new FormData();
      formData.append('file', file);
      const upload = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData,
      }).then(res => res.json());

      updatedImage = {
        public_id: upload.public_id,
        secure_url: upload.secure_url,
      };
    }

    await fetch(`/api/admin/about/about-goal/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...goal, imageUrl: updatedImage }),
    });

    router.push('/admin/dashboard/about-us/goal');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  if (!goal) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Edit Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={goal.title}
                onChange={e => setGoal({ ...goal, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={goal.description}
                onChange={e => setGoal({ ...goal, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Upload New Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="mt-4 flex flex-col items-start gap-2">
                <p className="text-sm text-muted-foreground">Current Image Preview:</p>
                <Image
                  src={previewUrl || goal.imageUrl?.secure_url}
                  alt="Current Image"
                  width={300}
                  height={200}
                  className="rounded-md border shadow-md"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Update Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
