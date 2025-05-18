'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateFaqPage() {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/contact/faq', {
      method: 'POST',
      body: JSON.stringify({ category, question, answer }),
    });
    router.push('/admin/dashboard/contact-us/faq');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New FAQ</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., translation, cleaning, general"
              className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Question */}
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the FAQ question"
              className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Answer */}
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              id="answer"
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a detailed answer"
              className="w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Create FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
