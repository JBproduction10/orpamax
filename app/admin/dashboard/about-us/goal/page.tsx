'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trash2, Pencil, Plus } from 'lucide-react';

export default function ListGoals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('/api/admin/about/about-goal')
      .then(res => res.json())
      .then(setGoals);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    await fetch(`/api/admin/about/about-goal/${id}`, { method: 'DELETE' });
    setGoals(goals.filter((g: any) => g._id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Goals</h2>
        <Link
          href="/admin/dashboard/about-us/goal/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add New
        </Link>
      </div>

      {goals.length === 0 ? (
        <p className="text-gray-500">No goals found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal: any) => (
            <div
              key={goal._id}
              className="rounded-2xl shadow-md border border-gray-200 p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <img
                  src={goal.imageUrl?.secure_url || ''}
                  alt={goal.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
              </div>

              <div className="flex justify-end items-center gap-4 mt-4">
                <Link
                  href={`/admin/dashboard/about-us/goal/edit/${goal._id}`}
                  className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                >
                  <Pencil size={16} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(goal._id)}
                  className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                >
                  <Trash2 size={16} />
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
