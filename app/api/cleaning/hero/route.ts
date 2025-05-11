import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";

const CleaningHero = CleaningModels.CleaningHero;

export async function GET(){
    await connectToDatabase();
    const heroes = await CleaningHero.find().sort({createdAt: -1})
    return NextResponse.json(heroes);
}