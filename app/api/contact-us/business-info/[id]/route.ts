// app/api/business-info/[id]/route.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import BusinessInfo from '@/lib/database/models/contact/BusinessInfo'
import { connectToDatabase } from '@/lib/database/mongodb'

export async function PUT(req: NextRequest) {
  await connectToDatabase()

  const url = new URL(req.url)
  const id = url.pathname.split('/').pop() // extract ID from the URL

  const data = await req.json()
  const updated = await BusinessInfo.findByIdAndUpdate(id, data, { new: true })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase()

  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()

  await BusinessInfo.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Deleted successfully' })
}
