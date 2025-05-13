'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // shadcn button
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, PencilLine, Plus } from 'lucide-react';

type Service = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/home/services')
      .then(res => res.json())
      .then(setServices);
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this service?');
    if (!confirmed) return;

    await fetch(`/api/admin/home/services/${id}`, { method: 'DELETE' });
    setServices(prev => prev.filter(s => s._id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link href="/admin/dashboard/home/home-services/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="text-gray-500">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <Card key={service._id} className="relative group overflow-hidden">
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-t-md"
                />
              )}
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{service.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                <div className="mt-4 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/dashboard/home/home-services/edit/${service._id}`)}
                  >
                    <PencilLine className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(service._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
