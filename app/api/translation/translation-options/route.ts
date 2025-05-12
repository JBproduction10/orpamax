import { connectToDatabase } from "@/lib/database/mongodb";
import TranslationOption from '@/lib/database/models/TranslationOption';
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    const faqs = await TranslationOption.find().sort({category: 1});
    return NextResponse.json(faqs);
}