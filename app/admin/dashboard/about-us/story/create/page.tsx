'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAboutStory() {
  const [paragraphs, setParagraphs] = useState(['']);
  const [imagePreview, setImagePreview] = useState('');
  const router = useRouter();

  const handleAddParagraph = () => setParagraphs([...paragraphs, '']);
  const handleRemoveParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const file = formData.get('image') as File;
    let imageUrl = null;

    if (file && file.size > 0) {
      const imgForm = new FormData();
      imgForm.append('file', file);

      const uploadRes = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: imgForm,
      });

      imageUrl = await uploadRes.json();
    }

    await fetch('/api/admin/about/about-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.get('title'),
        paragraphs: formData.getAll('paragraphs'),
        imageUrl,
      }),
    });

    router.push('/admin/dashboard/about-us/story');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h1 className="text-2xl font-bold mb-4">Create About Story</h1>

      <input name="title" placeholder="Title" className="w-full p-2 border" required />

      {paragraphs.map((para, i) => (
        <div key={i} className="flex gap-2 items-start">
          <textarea
            name="paragraphs"
            required
            className="w-full p-2 border"
            rows={3}
            placeholder={`Paragraph ${i + 1}`}
          />
          <button
            type="button"
            onClick={() => handleRemoveParagraph(i)}
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddParagraph}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        + Add Paragraph
      </button>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) setImagePreview(URL.createObjectURL(file));
        }}
      />

      {imagePreview && <img src={imagePreview} className="w-64" />}

      <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}
