import { connectToDatabase } from "@/lib/database/mongodb";
import CleaningModels from "@/lib/database/models/CleaningModels";

const ChecklistSection = CleaningModels.CleaningChecklist;

export async function GET() {
  await connectToDatabase()
  const data = await ChecklistSection.find().sort({ createdAt: -1 })
  return Response.json(data)
}
