import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";
import { NextResponse } from "next/server";

const ChecklistSection = CleaningModels.CleaningChecklist;

export async function GET(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase()
    const section = await ChecklistSection.findById(id)
    if(!section){
        return NextResponse.json({error: 'Checklist not found'}, {status: 404})
    }

    return NextResponse.json({item: section})
}

export async function PUT(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase()

     const body = await req.json();

    const updated = await ChecklistSection.findByIdAndUpdate(id,
        {title: body.title,
            items: body.items},
         { new: true });

    if(!updated) return NextResponse.json({error: "Not found"}, {status: 404})
    
    return NextResponse.json({item: updated});
}

export async function DELETE(req:Request, { params }: {params:Promise<{id: string}>}) {
    const {id} = await params;
    await connectToDatabase()
    const deleted = await ChecklistSection.findByIdAndDelete(id)
    if(!deleted) return NextResponse.json({error: 'Not found'}, {status: 404})
    return NextResponse.json({ success: true })
}
