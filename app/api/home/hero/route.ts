import { connectToDatabase } from "@/lib/database/mongodb"; 
import HomeHero from "@/lib/database/models/HomeHero";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const data = await HomeHero.find().sort({ createdAt: 1 });
  return NextResponse.json(data);
}


// export async function POST(req: NextRequest) {
//   await connectToDatabase();

//   const { title, description, image } = await req.json();

//   let hero = await HomeHero.findOne();
//   if (!hero) {
//     hero = new HomeHero();
//   }

//   hero.title = title;
//   hero.description = description;
//   hero.imageUrl = image;

//   await hero.save();

//   return NextResponse.json({ success: true, hero });
// }