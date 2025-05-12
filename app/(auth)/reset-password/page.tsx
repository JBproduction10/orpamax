"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, resetCode, newPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.ok) {
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage(data.error || "Failed to reset password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl mb-4 font-bold">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          placeholder="Reset Code"
          required
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}
