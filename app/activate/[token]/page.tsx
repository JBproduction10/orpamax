'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ActivateClientProps = {
  token: string;
};

export default function ActivateClient({ token }: ActivateClientProps) {
  const router = useRouter();
  const [message, setMessage] = useState('Activating your account...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await fetch('/api/auth/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Activation failed.');
        }

        setMessage(data.message || 'Activation successful.');
        setTimeout(() => router.push('/sign-in'), 3000);
      } catch (error: unknown) {
        const errorMsg =
          error instanceof Error ? error.message : 'Activation failed.';
        setMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    activate();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-semibold mb-4">Account Activation</h1>
      <p className={`text-lg ${loading ? 'text-gray-500' : 'text-blue-700'}`}>
        {message}
      </p>
    </div>
  );
}
