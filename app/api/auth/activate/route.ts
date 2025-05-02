import { connectToDatabase } from '@/lib/database/mongodb'
import User from '@/lib/database/models/User'
import { verifyActivationToken } from '@/utils/tokens'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    const decoded = verifyActivationToken(token) as { id: string }

    await connectToDatabase()
    const user = await User.findById(decoded.id)
    if (!user) return new Response(JSON.stringify({ message: 'Invalid token.' }), { status: 400 })

    user.isActivated = true
    await user.save()

    return new Response(JSON.stringify({ message: 'Account activated successfully.' }))
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Activation failed.' }), { status: 500 })
  }
}
