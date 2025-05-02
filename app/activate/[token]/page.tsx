'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type ActivateClientProps = {
  token: string
}

export default async function ActivateClient({ token }: ActivateClientProps) {
  const router = useRouter()
  const [message, setMessage] = useState('Activating your account...')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch('/api/auth/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Activation failed.')
        }

        setMessage(data.message || 'Account activated successfully.')
        setTimeout(() => router.push('/sign-in'), 3000)
      } catch (error: any) {
        setMessage(error.message || 'An error occurred during activation.')
      } finally {
        setLoading(false)
      }
    }

    activateAccount()
  }, [token, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Account Activation</h2>
        <p className={`text-lg ${loading ? 'text-gray-600' : 'text-blue-700'}`}>
          {message}
        </p>
      </div>
    </div>
  )
}
