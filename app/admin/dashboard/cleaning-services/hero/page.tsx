'use client';
import useSWR from 'swr';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CleaningHeroList() {
  const { data, mutate } = useSWR('/api/admin/cleaning/hero', fetcher);

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/cleaning/hero/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Cleaning Hero Entries</h1>
        <Link href="/admin/dashboard/cleaning-services/hero/create">
          <Button>Add New</Button>
        </Link>
      </div>
      <ul className="space-y-4">
        {data?.map((hero: any) => (
          <li key={hero._id} className="bg-white rounded p-4 shadow">
            <img src={hero.image.secure_url} alt="hero image" className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold">{hero.title}</h2>
            <p>{hero.description}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/admin/dashboard/cleaning-services/hero/edit/${hero._id}`}><Button>Edit</Button></Link>
              <Button onClick={() => handleDelete(hero._id)} variant="destructive">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}