import { connectToDatabase } from "@/lib/database/mongodb";
import HomeHero from "@/lib/database/models/HomeHero";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { use } from "react";

// Corrected GET method
export async function GET(req: Request, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const hero = await HomeHero.findById(id);
    if (!hero) {
      return new NextResponse("Hero not found", { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    return new NextResponse("Error fetching hero", { status: 500 });
  }
}

// POST method to create a new HomeHero
export async function POST(req: Request) {
  const data = await req.json();

  await connectToDatabase();

  const count = await HomeHero.countDocuments();
  if (count >= 3) {
    return NextResponse.json(
      { message: "You can only have up to 3 Home Hero slides." },
      { status: 400 }
    );
  }

  const newHomeHero = new HomeHero(data);
  await newHomeHero.save();

  return NextResponse.json({ message: "Home hero created successfully", newHomeHero });
}

// PUT method to update a HomeHero
export async function PUT(req: Request, {params}: {params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();

  await connectToDatabase();

  const homeHero = await HomeHero.findById(id);
  if (!homeHero) {
    return NextResponse.json({ message: "Hero not found" }, { status: 404 });
  }

  // If a new image is uploaded, replace the old one
  if (data.imageUrl) {
    const newImage = data.imageUrl;

    // Delete old image from Cloudinary
    if (homeHero.imageUrl?.public_id) {
      try {
        await cloudinary.uploader.destroy(homeHero.imageUrl.public_id);
      } catch (err) {
        console.error("Failed to delete previous image from Cloudinary:", err);
      }
    }

    // Update imageUrl
    homeHero.imageUrl = {
      secure_url: newImage.secure_url,
      public_id: newImage.public_id,
    };
  }

  Object.assign(homeHero, data);
  await homeHero.save();

  return NextResponse.json({ message: "Home hero updated successfully", homeHero });
}

// DELETE method to delete a HomeHero and its image
export async function DELETE(req: Request, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;

  await connectToDatabase();

  const homeHero = await HomeHero.findById(id);
  if (!homeHero) {
    return NextResponse.json({ message: "Home Hero not found" }, { status: 404 });
  }

  // Delete the image from Cloudinary
  if (homeHero.imageUrl?.public_id) {
    try {
      await cloudinary.uploader.destroy(homeHero.imageUrl.public_id);
    } catch (err) {
      console.error("Failed to delete image from Cloudinary:", err);
    }
  }

  await HomeHero.findByIdAndDelete(id);

  return NextResponse.json({ message: "Hero and associated image deleted successfully" });
}
