'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function EditTranslationHero() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetch(`/api/admin/translation/hero/${id}`)
      .then(res => res.json())
      .then(hero => {
        setData(hero);
        setTitle(hero.title);
        setDescription(hero.description);
        setImagePreview(hero.image?.secure_url || '');
      })
      .catch(() => toast.error('Failed to load hero data'));
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      toast.loading('Updating...');

      let uploadedImage = data.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const res = await fetch('/api/admin/upload/image', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Image upload failed');
        uploadedImage = await res.json();
      }

      const updateRes = await fetch(`/api/admin/translation/hero/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image: uploadedImage }),
      });

      if (!updateRes.ok) throw new Error('Failed to update hero');

      toast.success('Hero updated successfully');
      router.push('/admin/dashboard/translation-services/hero');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Translation Hero</h1>

      <label className="block mb-2 font-semibold">Title</label>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2 font-semibold">Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2 font-semibold">Image</label>
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-full h-60 object-cover mb-2 rounded" />
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />

      <Button onClick={handleSubmit} className="w-full">
        Update
      </Button>
    </div>
  );
}
