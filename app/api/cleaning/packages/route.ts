import { connectToDatabase } from '@/lib/database/mongodb'
import CleaningModels from '@/lib/database/models/CleaningModels'
import { NextResponse } from 'next/server'

const CleaningPackage = CleaningModels.CleaningPrice;

export async function GET() {
  await connectToDatabase()
  const packages = await CleaningPackage.find().sort({ createdAt: -1 })
  return NextResponse.json({ packages })
}