'use client';

import { useEffect, useState } from 'react';

export default function EditHomeHero() {
  const [homeHero, setHomeHero] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/home/hero')
      .then(res => res.json())
      .then(data => {
        setHomeHero(data);
        setTitle(data.title || '');
        setDescription(data.description || '');
        setPreviewUrl(data.image?.url || null);
      });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    let imageData = null;
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || '');

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      imageData = await res.json();
    }

    await fetch('/api/home/hero/[id]', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        image: imageData ? { url: imageData.secure_url, publicId: imageData.public_id } : homeHero.image,
      }),
    });

    alert('Hero section updated!');
    setIsSubmitting(false);
  }

  async function handleDeleteImage() {
    if (!confirm('Are you sure you want to delete the image?')) return;

    const res = await fetch('/api/home/hero', { method: 'DELETE' });

    if (res.ok) {
      setHomeHero((prev: any) => ({ ...prev, image: null }));
      setPreviewUrl(null);
      alert('Image deleted!');
    } else {
      alert('Failed to delete image.');
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Home Hero</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hero title"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg min-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hero description"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {previewUrl && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-600">Image Preview</h3>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-w-md rounded-lg border shadow-sm"
              />
            </div>
          )}

          {homeHero?.image && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-600">Current Image</h3>
              <img
                src={homeHero.image}
                alt="Current Hero"
                className="w-full max-w-md rounded-lg border mb-2"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="text-red-600 text-sm hover:underline"
              >
                Delete current image
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Hero Section'}
          </button>
        </form>
      </div>
    </div>
  );
}
