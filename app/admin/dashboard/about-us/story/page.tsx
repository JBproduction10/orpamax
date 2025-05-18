'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AboutStory = {
  _id: string;
  title: string;
  paragraphs: string[];
  imageUrl: {
    secure_url: string;
    public_id: string;
  };
};

export default function AboutStoryList() {
  const [story, setStory] = useState<AboutStory | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/about/about-story')
      .then(res => res.json())
      .then(data => {
        setStory(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async () => {
    if (!story) return;
    const confirmed = confirm('Are you sure you want to delete this story?');

    if (!confirmed) return;

    // First delete Cloudinary image
    await fetch('/api/admin/delete/image', {
      method: 'POST',
      body: JSON.stringify({ public_id: story.imageUrl?.public_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Then delete story document
    await fetch(`/api/admin/about/about-story/${story._id}`, {
      method: 'DELETE',
    });

    setStory(null);
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">About Story</h1>

      {!story ? (
        <div className="bg-white shadow p-6 rounded-lg border border-gray-200">
          <p className="mb-4 text-gray-700">No story created yet.</p>
          <Link
            href="/admin/dashboard/about-us/story/create"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create About Story
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow p-6 rounded-lg border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">{story.title}</h2>
          <div className="space-y-2 text-gray-700">
            {story.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {story.imageUrl?.secure_url && (
            <img
              src={story.imageUrl.secure_url}
              alt="About Story"
              className="w-full max-w-xl rounded-lg border mt-4"
            />
          )}

          <div className="flex gap-4 mt-6">
            <Link
              href={`/admin/dashboard/about-us/story/edit/${story._id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              ✏️ Edit
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
