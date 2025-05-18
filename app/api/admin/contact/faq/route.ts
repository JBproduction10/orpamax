import { connectToDatabase } from "@/lib/database/mongodb";
import ContactFaq from "@/lib/database/models/ContactFaq";
import { NextResponse } from "next/server";

export async function GET(){
    await connectToDatabase();
    const faqs = await ContactFaq.find().sort({category: 1});
    return NextResponse.json(faqs);
}

export async function POST(req: Request){
    await connectToDatabase();
    const data = await req.json();
    const faq = await ContactFaq.create(data)
    return NextResponse.json(faq);
} 