import { connectToDatabase } from "@/lib/database/mongodb";
import Footer from "@/lib/database/models/Footer";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectToDatabase();
  let footer = await Footer.findOne();

  if (!footer) {
    footer = new Footer();
    await footer.save();
  }

  return NextResponse.json(footer);
}

export async function PUT(req: Request) {
  await connectToDatabase();
  const data = await req.json();

  let footer = await Footer.findOne();
  if (!footer) footer = new Footer();

  // Handle Cloudinary logo
  if (data.logo?.url && data.logo?.publicId) {
    if (footer.logo?.publicId && footer.logo.publicId !== data.logo.publicId) {
      try {
        await cloudinary.uploader.destroy(footer.logo.publicId);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err);
      }
    }
    footer.logo = {
      url: data.logo.url,
      publicId: data.logo.publicId,
    };
  }

  footer.companyName = data.companyName;
  footer.email = data.email;
  footer.description = data.description;
  footer.location = data.location;
  footer.businessHour = data.businessHour;

  await footer.save();
  return NextResponse.json({ message: "Footer updated", footer });
}

export async function DELETE() {
  await connectToDatabase();

  const footer = await Footer.findOne();
  if (!footer) return NextResponse.json({ message: "Footer not found" }, { status: 404 });

  if (footer.logo?.publicId) {
    try {
      await cloudinary.uploader.destroy(footer.logo.publicId);
    } catch (err) {
      console.error("Failed to delete image from Cloudinary:", err);
      return NextResponse.json({ message: "Cloudinary deletion failed" }, { status: 500 });
    }
  }

  footer.logo = undefined;
  await footer.save();

  return NextResponse.json({ message: "Logo image deleted" });
}
