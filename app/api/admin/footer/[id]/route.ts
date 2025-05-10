import { connectToDatabase } from "@/lib/database/mongodb";
import Footer from "@/lib/database/models/Footer";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(req:Request, {params}:{params: Promise<{id: string}>}){
  const {id} = await params;

  try{
    await connectToDatabase();
    const footer = await Footer.findById(id);
    if(!footer){
      return new NextResponse("Footer not found", {status: 404})
    }
    return NextResponse.json(footer);
  }catch(err){
    return new NextResponse("Error fetching footer", {status: 500})
  }
}

// POST method
export async function POST(req: Request){
  const data = await req.json();

  await connectToDatabase();

  // const count = await Footer.countDocuments();
  // if(count )
  const newFooter = new Footer(data);
  await newFooter.save();

  return NextResponse.json({message: "Footer items have been created"})
}

export async function PUT(req: Request, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const data = await req.json();
  await connectToDatabase();

  let footer = await Footer.findById(id);
  if (!footer){
    return NextResponse.json({message: "Footer element not found"}, {status: 404})
  }

  // Handle Cloudinary logo if a new logo is uploaded, replace the old one
  if(data.logo){
    const newLogo = data.logo;

    // Delete old logo from cloudinary
    if(footer.logo?.public_id){
      try{
        await cloudinary.uploader.destroy(footer.logo.public_id);
      }catch(err){
        console.error("Failed to delete preview logo image from Cloudinary: ", err);
      }
    }

    // Update logo
    footer.logo = {
      secure_url: newLogo.secure_url,
      public_id: newLogo.public_id,
    };
  }

  Object.assign(footer, data);
  await footer.save();
  
  return NextResponse.json({ message: "Footer element updated", footer });
}

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  await connectToDatabase();

  const footer = await await Footer.findByIdAndDelete(id);
  if (!footer) return NextResponse.json({ message: "Footer not found" }, { status: 404 });

  // Delete the image from Cloudinary
  if (footer.logo?.public_id) {
    try {
      await cloudinary.uploader.destroy(footer.logo.public_id);
    } catch (err) {
      console.error("Failed to delete image from Cloudinary:", err);
      return NextResponse.json({ message: "Cloudinary deletion failed" }, { status: 500 });
    }
  }

  
  footer.logo = undefined;
  await footer.save();

  return NextResponse.json({ message: "Logo image deleted" });
}