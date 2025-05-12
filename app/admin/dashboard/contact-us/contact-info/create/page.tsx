"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateContactInfo() {
  const [form, setForm] = useState({
    type: "",
    title: "",
    description: "",
    icon: "",
    details: [""],
  });

  const router = useRouter();

  const handleChange = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/contact/contact-info", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/admin/dashboard/contact-us/contact-info");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Contact Info</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <input
            type="text"
            placeholder="e.g., visit, call, email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            placeholder="Short description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Lucide name)</label>
          <input
            type="text"
            placeholder="e.g., map, phone, mail"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => handleChange("icon", e.target.value)}
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
          <textarea
            placeholder="Enter each detail separated by a comma"
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-500"
            rows={4}
            onChange={(e) => handleChange("details", e.target.value.split(","))}
          />
          <p className="text-xs text-gray-500 mt-1">Separate multiple items with commas (e.g., "123 Main St, New York, NY").</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Create Contact Info
          </button>
        </div>
      </form>
    </div>
  );
}
