import { connectToDatabase } from "@/lib/database/mongodb";
import Footer from "@/lib/database/models/Footer";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

async function PUT(req: Request){
    await connectToDatabase();

    const data= await req.json();
    let footer = await Footer.findOne();

    if(!footer){
        footer = new Footer();
    }

    // If new Image provided, delete the old one from Cloudinary
    if(data.logo?.url && data.logo?.publicId){
        if(footer.logo?.publicId && footer.logo.publicId !== data.logo.publicId)
            try{
            await cloudinary.uploader.destroy(footer.logo.publicId);
        }catch(err){
            console.error("Failed to delete old image from Cloudinary:", err)
        }

        footer.image = {
            url: data.image.url,
            publicId: data.image.publicId,
        };
    }

    footer.companyName= data.companyName;
    footer.email = data.email;
    footer.description = data.description;
    footer.location = data.location;
    footer.businessHour = data.businessHour;

    await footer.save();

    return NextResponse.json({message: "Footer updated", Footer});
}

export async function DELETE(req:Request){
    await connectToDatabase();

    const footer = await Footer.findOne();
    if(!footer){
        return NextResponse.json({message: "No footer content found"}, {status: 404});
    }

    // Delete image from Cloudinary if it exists
    if(footer.image?.publicId){
        try{
            await cloudinary.uploader.destroy(footer.image.publicId);
        }catch(err){
            console.error("Cloudinary deletion failed:", err);
            return NextResponse.json({message: "Cloudinary deletion failed"}, {status:500});
        }
    }

    // Clear image info in MongoDB
    footer.image = undefined;
    await footer.save();

    return NextResponse.json({message:"Footer logo image deleted"})
}