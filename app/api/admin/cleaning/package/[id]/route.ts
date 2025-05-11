import { connectToDatabase } from '@/lib/database/mongodb'
import CleaningModels from '@/lib/database/models/CleaningModels'
import { NextResponse } from 'next/server'
import { Types } from 'mongoose'

const CleaningPackage = CleaningModels.CleaningPrice;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase()
  const {id} = await params

  // // Check if ID is valid
  // if (!Types.ObjectId.isValid(id)) {
  //   return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 })
  // }

  // Fetch the package by ID
  const packageData = await CleaningPackage.findById(id)

  if (!packageData) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 })
  }

  return NextResponse.json({ package: packageData })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;

  await connectToDatabase()

  const body = await req.json()
  const updated = await CleaningPackage.findByIdAndUpdate(id, body, { new: true })

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  return NextResponse.json({ package: updated })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  await connectToDatabase()
  const deleted = await CleaningPackage.findByIdAndDelete(id)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
