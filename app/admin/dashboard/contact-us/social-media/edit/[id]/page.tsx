'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

type SocialForm = {
  facebook: string;
  instagram: string;
  linkedin: string;
};

export default function EditSocial() {
  const [form, setForm] = useState<SocialForm>({
    facebook: '',
    instagram: '',
    linkedin: '',
  });

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetch(`/api/admin/contact/social/${params.id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/contact/social/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/dashboard/contact-us/social-media');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Edit Social Media Links</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(Object.keys(form) as (keyof SocialForm)[]).map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={"www.facebook.com/orpamax"}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        ))}
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
