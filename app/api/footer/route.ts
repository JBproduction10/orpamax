import { connectToDatabase } from "@/lib/database/mongodb";
import Footer from "@/lib/database/models/Footer";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const footer = await Footer.findOne();
if (!footer) {
  return NextResponse.json(
    {
      companyName: "", 
      logo: { secure_url: "", public_id: "" },
      businessHour: "",
      location: '',
      description: '',
      email: '',
      phone:'',
    },
    { status: 200 }
  );
}
return NextResponse.json(footer);

}
