'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ListSocialLinks() {
  const [links, setLinks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch('/api/admin/contact/social');
        if (!res.ok) throw new Error('Failed to fetch social links');
        const data = await res.json();
        setLinks(data);
      } catch (err) {
        console.error(err);
        setError('Could not load social links.');
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/contact/social/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete social link');
      setLinks((prev) => prev.filter((link) => link._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete the social link.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Social Media Links</h1>
        <Link href="/admin/dashboard/contact-us/social-media/create">
          <Button variant="default">+ Add Link</Button>
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="grid gap-4">
          {links.map((link) => (
            <li key={link._id} className="bg-white shadow p-6 rounded-xl border space-y-2">
              <div className="space-y-1">
                <p><span className="font-medium">Facebook:</span> {link.facebook}</p>
                <p><span className="font-medium">Instagram:</span> {link.instagram}</p>
                <p><span className="font-medium">LinkedIn:</span> {link.linkedin}</p>
              </div>
              <div className="flex gap-4 mt-4">
                <Link
                  href={`/admin/dashboard/contact-us/social-media/edit/${link._id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Edit
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(link._id)}
                  disabled={deletingId === link._id}
                >
                  {deletingId === link._id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
