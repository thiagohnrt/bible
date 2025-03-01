import dbConnection from "@/database/mongoDB";
import VerseOfTheDayModel from "@/models/verseOfTheDayModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function isAuthenticated(): boolean {
  const cookieStore = cookies();
  return !!cookieStore.get("user-auth");
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await dbConnection();
    const versesOfTheDay = await VerseOfTheDayModel.find();
    return NextResponse.json(versesOfTheDay, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await dbConnection();
    const body = await req.json();
    delete body._id;
    await VerseOfTheDayModel.create(body);
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await dbConnection();
    const body = await req.json();
    if (body._id) {
      await VerseOfTheDayModel.updateOne({ _id: body._id }, body);
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      throw new Error("Id not found");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await dbConnection();
    const body = await req.json();
    if (body._id) {
      await VerseOfTheDayModel.deleteOne({ _id: body._id });
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      throw new Error("Id not found");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}
