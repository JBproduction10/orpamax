'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EditLanguagePage() {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`/api/admin/translation/language/${id}`)
      .then(res => res.json())
      .then(data => setName(data.name));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/translation/language/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
    router.push('/admin/dashboard/translation-services/languages');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Language</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <Input value={name} onChange={e => setName(e.target.value)} required />
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
