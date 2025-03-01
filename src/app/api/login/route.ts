import dbConnection from "@/database/mongoDB";
import UserModel from "@/models/userModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Credential {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnection();
    const cookieStore = cookies();
    const credential: Credential = await req.json();
    const user = await UserModel.findOne(credential);
    cookieStore.delete("user-auth");
    if (user?._id) {
      return NextResponse.json({ token: user._id });
    }
    throw new Error("User not found");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (<any>error).message }, { status: 500 });
  }
}
