'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type SocialForm = {
  facebook: string;
  instagram: string;
  linkedin: string;
};

export default function CreateSocial() {
  const [form, setForm] = useState<SocialForm>({
    facebook: '',
    instagram: '',
    linkedin: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/contact/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/dashboard/contact-us/social-media');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Add Social Media Links</h2>
      <span>e.g. www.facebook.com/name</span>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(Object.keys(form) as (keyof SocialForm)[]).map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1) || "www.facebook.com/orpamax"}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        ))}
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
