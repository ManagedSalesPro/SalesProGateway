import { NextResponse } from "next/server";
import getUserProfileDataModel from "../../../models/UserProfile.js"

export async function POST(req) {
  let body;

  try {
    body = await req.json();
    console.log('body:', body);

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    const UserProfileDataModel = await getUserProfileDataModel();
    const userProfile = await UserProfileDataModel.findOne({ email: body.email });
    
    if (!userProfile) {
      return NextResponse.json({ error: 'User not found'  }, { status: 500 });
    }

    return NextResponse.json({userProfile});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
