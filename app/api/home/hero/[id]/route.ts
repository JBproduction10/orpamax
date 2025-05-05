// app/api/home/hero/[id]/route.ts

import { connectToDatabase } from "@/lib/database/mongodb";
import HomeHero from "@/lib/database/models/HomeHero";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function PUT(req: Request) {
  await connectToDatabase();

  const data = await req.json();
  let hero = await HomeHero.findOne();

  if (!hero) {
    hero = new HomeHero();
  }

  // If new image provided, delete the old one from Cloudinary
  if (data.image?.url && data.image?.publicId) {
    if (hero.image?.publicId && hero.image.publicId !== data.image.publicId) {
      try {
        await cloudinary.uploader.destroy(hero.image.publicId);
      } catch (err) {
        console.error("Failed to delete old image from Cloudinary:", err);
      }
    }

    hero.image = {
      url: data.image.url,
      publicId: data.image.publicId,
    };
  }

  hero.title = data.title;
  hero.description = data.description;

  await hero.save();

  return NextResponse.json({ message: "Hero updated", hero });
}

export async function DELETE(req: Request) {
  await connectToDatabase();

  const hero = await HomeHero.findOne();
  if (!hero) {
    return NextResponse.json({ message: "No hero content found" }, { status: 404 });
  }

  // Delete image from Cloudinary if it exists
  if (hero.image?.publicId) {
    try {
      await cloudinary.uploader.destroy(hero.image.publicId);
    } catch (error) {
      console.error("Cloudinary deletion failed:", error);
      return NextResponse.json({ message: "Cloudinary deletion failed" }, { status: 500 });
    }
  }

  // Clear image info in MongoDB
  hero.image = undefined;
  await hero.save();

  return NextResponse.json({ message: "Hero image deleted" });
}

