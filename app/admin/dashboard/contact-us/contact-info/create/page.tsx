'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function CreateContactInfo() {
  const router = useRouter();
  const [form, setForm] = useState({ type: '', title: '', description: '', lines: [''] });

  const addLine = () => {
    setForm({ ...form, lines: [...form.lines, ''] });
  };

  const removeLine = (index: number) => {
    const lines = form.lines.filter((_, i) => i !== index);
    setForm({ ...form, lines });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/contact/contact-info', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    router.push('/admin/dashboard/contact-us/contact-info');
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Create Contact Info</h2>

        <div className="space-y-1">
          <Label>Type (visit, call, email)</Label>
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
          {form.lines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <Input
                className="flex-1"
                placeholder={`Line ${i + 1}`}
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

        <Button type="submit" className="w-full">Create</Button>
      </form>
    </Card>
  );
}
