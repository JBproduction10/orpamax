"use client";

import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, PencilLine, Plus } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ContactInfoList() {
  const { data, mutate } = useSWR("/api/admin/contact/contact-info", fetcher);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    await fetch(`/api/admin/contact/contact-info/${id}`, { method: "DELETE" });
    mutate();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Contact Info</h1>
        <Link
          href="/admin/dashboard/contact-us/contact-info/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" /> Add New
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data?.map((item: any) => (
          <div
            key={item._id}
            className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="mb-2 text-lg font-medium text-gray-900">{item.title}</div>
            <div className="mb-1 text-gray-600">{item.description}</div>
            <ul className="mb-4 text-sm text-gray-500 list-disc pl-4">
              {item.details.map((detail: string, i: number) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Link
                href={`/admin/dashboard/contact-us/contact-info/edit/${item._id}`}
                className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition"
              >
                <PencilLine className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
