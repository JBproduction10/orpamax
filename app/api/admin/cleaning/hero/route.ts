import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";

const CleaningHero = CleaningModels.CleaningHero;

export async function GET(){
    await connectToDatabase();
    const heroes = await CleaningHero.find().sort({createdAt: -1})
    return NextResponse.json(heroes);
}

export async function POST(req: Request){
    await connectToDatabase();
    const body = await req.json();
    const hero = await CleaningHero.create(body);
    return NextResponse.json(hero)
}