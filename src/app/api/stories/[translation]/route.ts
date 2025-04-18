import dbConnection from "@/database/mongoDB";
import StoryModel from "@/models/storyModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { translation: string } }) {
  try {
    const { translation } = params;
    if (!translation) {
      return NextResponse.json({ message: "Translation parameter is required" }, { status: 400 });
    }

    await dbConnection();
    const stories = await StoryModel.find({ translation });
    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}
