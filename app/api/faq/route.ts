import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import Faq from "@/lib/database/models/Faq";

export async function GET() {
    await connectToDatabase();

    try{
        const faq = await Faq.find();
        return NextResponse.json(faq);
    }catch(err){
        return NextResponse.json(err, {status: 500});
    }
}