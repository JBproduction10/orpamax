'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ContactInfoList() {
  const { data, mutate } = useSWR('/api/admin/contact/contact-info', fetcher);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this contact info?')) return;
    await fetch(`/api/admin/contact/contact-info/${id}`, { method: 'DELETE' });
    mutate();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Info</h1>
        <Link href="/admin/dashboard/contact-us/contact-info/create">
          <Button>Add New</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {data?.map((item: any) => (
          <Card key={item._id} className="p-4 space-y-2 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500 capitalize">{item.type}</p>
              <p className="text-sm">{item.description}</p>
              <ul className="text-sm mt-2 list-disc ml-4 text-muted-foreground">
                {item.lines.map((line: string, idx: number) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 mt-4">
              <Link href={`/admin/dashboard/contact-us/contact-info/edit/${item._id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(item._id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
