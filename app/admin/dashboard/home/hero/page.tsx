"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Hero = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: { secure_url: string; public_id?: string }[];
};

export default function AllHomeHeros() {
  const [heros, setHeros] = useState<Hero[]>([]);

  useEffect(() => {
    fetch("/api/admin/home/hero")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHeros(data);
        } else {
          console.error("Expected an array of heros:", data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch hero:", err);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this hero section?");
    if (!confirmed) return;

    await fetch(`/api/admin/home/hero/${id}`, {
      method: "DELETE",
    });

    setHeros((prev) => prev.filter((hero) => hero._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hero Sections</h1>
        <Link
          href="/admin/dashboard/home/hero/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add New Hero
        </Link>
      </div>

      {heros.length === 0 ? (
        <div className="text-gray-600 text-center py-20">No hero sections found.</div>
      ) : (
        <div className="grid gap-6">
          {heros.map((hero) => (
            <div
              key={hero._id}
              className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg border"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{hero.title}</h2>
                <p className="text-gray-600 mt-2">{hero.description}</p>
              </div>

              {hero.imageUrl && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {hero.imageUrl.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.secure_url}
                      alt={`Hero image ${idx}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Link
                  href={`/admin/dashboard/home/hero/edit/${hero._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(hero._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
