'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CreateLanguagePage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/translation/language', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    router.push('/admin/dashboard/translation-services/languages');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Language</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Language name" value={name} onChange={e => setName(e.target.value)} required />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
