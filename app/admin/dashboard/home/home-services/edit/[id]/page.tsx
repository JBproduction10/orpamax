'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type ServiceFormData = {
  _id?: string;
  title: string;
  description: string;
  slug: string;
  features: string;
  icon: string;
  imageUrl?: string;
  imagePublicId?: string;
  file: File | null;
};

export default function EditService() {
  const [data, setData] = useState<ServiceFormData>({
    title: '',
    description: '',
    slug: '',
    features: '',
    icon: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  // const id = params.get('id');
  const {id} = useParams()

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/home/services/${id}`);
      const service = await res.json();
      setData({
        ...service,
        features: service.features.join(', '),
        file: null,
      });
      setLoading(false);
    };

    if (id) fetchService();
  }, [id]);

  const handleUpload = async () => {
    if (!data.file) return { secure_url: data.imageUrl, public_id: data.imagePublicId };
    const formData = new FormData();
    formData.append('file', data.file);
    const res = await fetch('/api/admin/upload/image', { method: 'POST', body: formData });
    return await res.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const image = await handleUpload();

    const payload = {
      ...data,
      features: data.features.split(',').map(f => f.trim()),
      imageUrl: image.secure_url,
      imagePublicId: image.public_id,
    };

    await fetch(`/api/admin/home/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    setLoading(false);
    router.push('/admin/dashboard/home/home-services');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Service</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Enter service title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={data.slug}
            onChange={e => setData({ ...data, slug: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            placeholder="e.g.translation-services or cleaning-services. The slug can only be those 2 e.g"
            required
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Icon</label>
          <input
            type="text"
            value={data.icon}
            onChange={e => setData({ ...data, icon: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            placeholder="e.g. FaBroom"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            rows={4}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Describe the service..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Features</label>
          <textarea
            value={data.features}
            onChange={e => setData({ ...data, features: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Feature1, Feature2, Feature3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Image</label>
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt="Current"
              className="w-32 h-32 object-cover rounded border mb-3"
            />
          )}

          <input
            type="file"
            onChange={e => setData({ ...data, file: e.target.files?.[0] || null })}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Update Service'}
        </button>
      </form>
    </div>
  );
}
