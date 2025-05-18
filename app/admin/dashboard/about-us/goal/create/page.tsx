'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Input,
} from '@/components/ui/input';
import {
  Textarea,
} from '@/components/ui/textarea';
import {
  Button,
} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Label,
} from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ImageIcon } from 'lucide-react';

type GoalForm = {
  type: string;
  title: string;
  description: string;
  imageUrl: File | null;
};

export default function CreateGoal() {
  const router = useRouter();
  const [form, setForm] = useState<GoalForm>({
    type: '',
    title: '',
    description: '',
    imageUrl: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let uploadedImage = null;
    if (form.imageUrl) {
      const uploadData = new FormData();
      uploadData.append('file', form.imageUrl);

      const uploadRes = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: uploadData,
      }).then(res => res.json());

      uploadedImage = {
        public_id: uploadRes?.public_id,
        secure_url: uploadRes?.secure_url,
      };
    }

    const payload = {
      type: form.type,
      title: form.title,
      description: form.description,
      imageUrl: uploadedImage,
    };

    await fetch('/api/admin/about/about-goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    router.push('/admin/dashboard/about-us/goal');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, imageUrl: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold">Create Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Select */}
            <div className="space-y-2">
              <Label className="text-sm">Type</Label>
              <Select onValueChange={val => setForm({ ...form, type: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vision">Vision</SelectItem>
                  <SelectItem value="mission">Mission</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label className="text-sm">Title</Label>
              <Input
                placeholder="Enter goal title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm">Description</Label>
              <Textarea
                rows={4}
                placeholder="Write goal description..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm">Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto rounded-lg border shadow-sm"
                  />
                </div>
              )}
              {!preview && (
                <div className="w-full h-48 border rounded-lg flex items-center justify-center text-muted-foreground bg-muted/20">
                  <ImageIcon className="h-10 w-10 opacity-50" />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Goal'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
