"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditContactInfo() {
  const [form, setForm] = useState({ type: "", title: "", description: "", icon: "", details: [] });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/admin/contact/contact-info/${id}`).then(res => res.json()).then(setForm);
  }, [id]);

  const handleChange = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch(`/api/admin/contact/contact-info/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    router.push("/admin/admin/contact/contact-info");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto">
      <input value={form.type} onChange={(e) => handleChange("type", e.target.value)} className="input" />
      <input value={form.title} onChange={(e) => handleChange("title", e.target.value)} className="input" />
      <input value={form.description} onChange={(e) => handleChange("description", e.target.value)} className="input" />
      <input value={form.icon} onChange={(e) => handleChange("icon", e.target.value)} className="input" />
      <textarea
        value={form.details.join(", ")}
        onChange={(e) => handleChange("details", e.target.value.split(","))}
        className="input"
      />
      <button type="submit" className="btn">Update</button>
    </form>
  );
}
