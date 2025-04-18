import dbConnection from "@/database/mongoDB";
import StoryModel from "@/models/storyModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { translation: string; book: string; chapter: string } }
) {
  try {
    const { translation, book, chapter } = params;
    if (!translation || !book || !chapter) {
      return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
    }

    await dbConnection();
    const stories = await StoryModel.find({ translation, book, chapter });
    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}
