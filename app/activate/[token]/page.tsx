'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ActivateClient({ token }: { token: string }) {
  const router = useRouter()
  const [message, setMessage] = useState('Activating your account...')

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await fetch('/api/auth/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        const data = await res.json()
        setMessage(data.message)
        setTimeout(() => router.push('/sign-in'), 3000)
      } catch {
        setMessage('Activation failed.')
      }
    }

    activate()
  }, [token, router])

  return <p className="text-center mt-20">{message}</p>
}
