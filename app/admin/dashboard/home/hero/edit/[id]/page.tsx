"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditHomeHero() {
  const params = useParams();
  const id = params?.id as string;

  const [homeHero, setHomeHero] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`/api/admin/home/hero/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched hero:", data);
        setHomeHero(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
      } catch (error) {
        console.error("Error fetching hero section:", error);
        alert("Failed to fetch hero section. Please try again later.");
      }
    };

    if (id) {
      fetchHero();
    }
  }, [id]);

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

  const handleDeleteImage = async (public_id: string) => {
    const confirmed = confirm("Are you sure you want to delete this image?");
    if (!confirmed || !homeHero) return;

    await fetch(`/api/admin/delete/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id }),
    });

    const filteredImages = homeHero.imageUrl.filter(
      (img: any) => img.public_id !== public_id
    );

    await fetch(`/api/admin/home/hero/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        imageUrl: filteredImages,
      }),
    });

    setHomeHero((prev: any) => ({
      ...prev,
      imageUrl: filteredImages,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
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
      imageUrl: uploadedImages.length ? uploadedImages : homeHero?.imageUrl || [],
    };

    await fetch(`/api/admin/home/hero/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Hero section updated!");
    setIsSubmitting(false);
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
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg min-h-[150px] resize-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload New Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500"
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

          {homeHero?.imageUrl?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Current Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {homeHero.imageUrl.map((img: any, idx: number) => (
                  <div key={idx} className="relative">
                    <img
                      src={img.secure_url}
                      alt={`Current ${idx}`}
                      className="w-full rounded shadow"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.public_id)}
                      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Hero Section"}
          </button>
        </form>
      </div>
    </div>
  );
}
