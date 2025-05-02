'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type ActivatePageProps = {
  params: {
    token: string;
  };
};

export default function Activate({ params }: ActivatePageProps) {
  const router = useRouter();
  const [message, setMessage] = useState("Activating your account...");

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await fetch("/api/auth/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: params.token }),
        });
        const data = await res.json();
        setMessage(data.message);
        setTimeout(() => router.push("/sign-in"), 3000);
      } catch (err) {
        setMessage("Activation failed.");
      }
    };

    activate();
  }, [params.token, router]);

  return <p className="text-center mt-20">{message}</p>;
}
