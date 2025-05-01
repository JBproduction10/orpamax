// app/admin/business/page.tsx

import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminBusinessForm from '@/components/admin/AdminBusinessForm'

export default async function AdminBusinessPage() {
//   const session = await getServerSession(authOptions)

  // Optional: Customize this logic to check for admin role
//   if (!session) {
//     return redirect('/api/auth/signin')
//   }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <AdminBusinessForm />
    </main>
  )
}
