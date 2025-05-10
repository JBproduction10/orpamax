"use client";

import { useState } from "react";

export default function CreateHomeHero() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);
    if (files) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls(previews);
    } else {
      setPreviewUrls([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let uploadedImages = [];

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("file", images[i]);

        const res = await fetch(`/api/admin/upload/image`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        uploadedImages.push({
          secure_url: data.secure_url,
          public_id: data.public_id,
        });
      }
    }

    const payload = {
      title,
      description,
      imageUrl: uploadedImages,
    };

    const res = await fetch(`/api/admin/home/hero/[id]`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("New hero section created!");
      setTitle("");
      setDescription("");
      setImages(null);
      setPreviewUrls([]);
    }

    setIsSubmitting(false);
  };

  // Disable submit if title, description, or image is missing
  const isSubmitDisabled = !title || !description || !images || images.length === 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow border">
      <h1 className="text-2xl font-bold mb-6">Create New Hero Section</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded min-h-[100px]"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Preview ${idx}`}
                className="w-full rounded shadow border"
              />
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitDisabled || isSubmitting}
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
            isSubmitDisabled || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Hero Section"}
        </button>
      </form>
    </div>
  );
}
