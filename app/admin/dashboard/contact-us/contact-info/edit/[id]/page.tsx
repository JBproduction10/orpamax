'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function EditContactInfo() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/admin/contact/contact-info/${id}`)
      .then(res => res.json())
      .then(setForm);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/contact/contact-info/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    });
    router.push('/admin/dashboard/contact-us/contact-info');
  };

  const addLine = () => {
    setForm({ ...form, lines: [...form.lines, ''] });
  };

  const removeLine = (index: number) => {
    const lines = form.lines.filter((_: string, i: number) => i !== index);
    setForm({ ...form, lines });
  };

  if (!form) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Card className="max-w-2xl mx-auto mt-8 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Edit Contact Info</h2>

        <div className="space-y-1">
          <Label>Type</Label>
          <Input value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        </div>

        <div className="space-y-1">
          <Label>Title</Label>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="space-y-1">
          <Label>Description</Label>
          <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="space-y-2">
          <Label>Lines</Label>
          {form.lines.map((line: string, i: number) => (
            <div key={i} className="flex gap-2">
              <Input
                className="flex-1"
                value={line}
                onChange={e => {
                  const lines = [...form.lines];
                  lines[i] = e.target.value;
                  setForm({ ...form, lines });
                }}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeLine(i)}
                disabled={form.lines.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addLine}>+ Add Line</Button>
        </div>

        <Button type="submit" className="w-full">Update</Button>
      </form>
    </Card>
  );
}
