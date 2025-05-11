import { connectToDatabase } from "@/lib/database/mongodb"; 
import CleaningModels from "@/lib/database/models/CleaningModels";
import { NextRequest, NextResponse } from "next/server";

const HeroSchama = CleaningModels.CleaningHero;

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const heroes = await HeroSchama.find(); // get all hero entries

  return NextResponse.json(heroes);
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