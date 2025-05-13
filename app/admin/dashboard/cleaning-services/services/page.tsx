'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) =>
  fetch(url)
    .then(res => res.json())
    .then(data => data.services); // ✅ Extract only the array

const CleaningServicesAdminList = () => {
  const { data: services, mutate } = useSWR('/api/admin/cleaning/services', fetcher);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/admin/cleaning/services/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Cleaning Services</h2>
        <Link href="/admin/dashboard/cleaning-services/services/create">
          <Button>Add New</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(services) && services.map((service: any) => (
          <div key={service._id} className="border rounded p-4 space-y-2 shadow">
            <img src={service.imageUrl.secure_url} alt="" className="h-48 w-full object-cover rounded" />
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <div className="flex gap-2">
              <Link href={`/admin/dashboard/cleaning-services/services/edit/${service._id}`}>
                <Button>Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(service._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CleaningServicesAdminList;
