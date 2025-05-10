import { connectToDatabase } from "@/lib/database/mongodb";
import HomeHero from "@/lib/database/models/HomeHero";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic'; // Required for dynamic params

// GET single hero
export async function GET(
  req: Request,
  { params }: { params: { id: string } } // Correct parameter destructuring
) {
  try {
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectToDatabase();
    const hero = await HomeHero.findById(id);
    
    if (!hero) {
      return NextResponse.json({ message: "Hero not found" }, { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// PUT update hero
export async function PUT(
  req: Request,
  { params }: { params: { id: string } } // Correct parameter destructuring
) {
  try {
    const { id } = params;
    const data = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectToDatabase();
    const homeHero = await HomeHero.findById(id);
    
    if (!homeHero) {
      return NextResponse.json({ message: "Hero not found" }, { status: 404 });
    }

    // Handle image updates
    if (data.imageUrl) {
      if (homeHero.imageUrl?.public_id) {
        await cloudinary.uploader.destroy(homeHero.imageUrl.public_id);
      }
      homeHero.imageUrl = {
        secure_url: data.imageUrl.secure_url,
        public_id: data.imageUrl.public_id,
      };
    }

    Object.assign(homeHero, data);
    await homeHero.save();

    return NextResponse.json({ 
      message: "Home hero updated successfully", 
      homeHero 
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error"},
      { status: 500 }
    );
  }
}

// DELETE hero
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } } // Correct parameter destructuring
) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectToDatabase();
    const homeHero = await HomeHero.findById(id);
    
    if (!homeHero) {
      return NextResponse.json({ message: "Hero not found" }, { status: 404 });
    }

    if (homeHero.imageUrl?.public_id) {
      await cloudinary.uploader.destroy(homeHero.imageUrl.public_id);
    }

    await HomeHero.findByIdAndDelete(id);

    return NextResponse.json({ 
      message: "Hero and image deleted successfully" 
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error"},
      { status: 500 }
    );
  }
}