'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminLanguageList() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch('/api/admin/translation/language')
      .then(res => res.json())
      .then(setLanguages);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this language?')) return;
    await fetch(`/api/admin/translation/language/${id}`, { method: 'DELETE' });
    setLanguages(prev => prev.filter((lang: any) => lang._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Translation Languages</h1>
        <Link href="/admin/dashboard/translation-services/languages/create">
          <Button>+ Add Language</Button>
        </Link>
      </div>

      {languages.length === 0 ? (
        <p>No languages found.</p>
      ) : (
        <ul className="space-y-2">
          {languages.map((lang: any) => (
            <li key={lang._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
              <span>{lang.name}</span>
              <div className="space-x-2">
                <Link href={`/admin/dashboard/translation-services/languages/edit/${lang._id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(lang._id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
