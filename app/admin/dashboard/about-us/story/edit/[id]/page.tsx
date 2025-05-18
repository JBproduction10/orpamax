'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

type AboutStory = {
  _id: string;
  title: string;
  paragraphs: string[];
  imageUrl: {
    secure_url: string;
    public_id: string;
  };
};

export default function EditAboutStory() {
  const [story, setStory] = useState<AboutStory | null>(null);
  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    fetch(`/api/admin/about/about-story/${id}`)
      .then(res => res.json())
      .then(data => {
        setStory(data);
        setTitle(data.title);
        setParagraphs(data.paragraphs);
        setImagePreview(data.imageUrl?.secure_url || null);
      });
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleParagraphChange = (value: string, index: number) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let uploadedImage = story?.imageUrl;

    // 1. If new image, delete old and upload new
    if (imageFile) {
      if (uploadedImage?.public_id) {
        await fetch('/api/admin/delete/image', {
          method: 'POST',
          body: JSON.stringify({ public_id: uploadedImage.public_id }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const formData = new FormData();
      formData.append('file', imageFile);
      const imgRes = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData,
      });
      uploadedImage = await imgRes.json();
    }

    const res = await fetch(`/api/admin/about/about-story/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        paragraphs,
        imageUrl: uploadedImage,
      }),
    });

    if (res.ok) {
      router.push('/admin/dashboard/about-us/story');
    } else {
      alert('Failed to update story.');
    }

    setSubmitting(false);
  };

  if (!story) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit About Story</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {/* Paragraphs */}
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1">Paragraphs</label>
          {paragraphs.map((p, i) => (
            <textarea
              key={i}
              value={p}
              onChange={e => handleParagraphChange(e.target.value, i)}
              className="w-full border px-4 py-2 rounded"
              rows={3}
              required
            />
          ))}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-full max-w-md rounded border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
