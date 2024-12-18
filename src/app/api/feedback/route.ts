import dbConnection from "@/database/mongoDB";
import FeedbackModel from "@/models/feedbackModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnection();
    const body = await req.json();
    const userAgent = req.headers.get("user-agent") || "";
    await FeedbackModel.create({ ...body, userAgent });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}
