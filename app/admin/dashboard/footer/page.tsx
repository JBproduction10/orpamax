'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FooterList() {
  const [footers, setFooters] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/footer')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFooters(data);
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching footer entries:", error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Footer Entries</h1>
        <Link
          href="/admin/dashboard/footer/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Create Footer
        </Link>
      </div>

      <div className="space-y-4">
        {footers.map((footer) => (
          <div key={footer._id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{footer.companyName}</h2>
            <p>{footer.description}</p>
            <p className="text-sm text-gray-600">Email: {footer.email}</p>
            <p className="text-sm text-gray-600">Location: {footer.location}</p>
            <p className="text-sm text-gray-600">Business Hours: {footer.businessHour}</p>
            <p className="text-sm text-gray-600">Phone Number: {footer?.phone!}</p>
            {footer.logo?.secure_url && (
              <img
                src={footer.logo.secure_url}
                alt="Logo"
                className="w-32 h-auto mt-2"
              />
            )}
            <div className="mt-4">
              <Link
                href={`/admin/dashboard/footer/edit/${footer._id}`}
                className="text-blue-600 hover:underline mr-4"
              >
                Edit
              </Link>
              <button
                className="text-red-600 hover:underline"
                onClick={async () => {
                  if (confirm('Are you sure?')) {
                    await fetch(`/api/admin/footer/${footer._id}`, { method: 'DELETE' });
                    setFooters(f => f.filter(entry => entry._id !== footer._id));
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
