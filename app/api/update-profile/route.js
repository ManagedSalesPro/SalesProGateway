import { NextResponse } from "next/server";
import getUserProfileDataModel from "../../../models/UserProfile.js";

// This route is used to update the logged in users profile.
// The API call is initiated by <ButtonEditProfile /> component
// Duplicate emails just return 200 OK
export async function POST(req) {

  const body = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {

    const UserProfileDataModel = await getUserProfileDataModel();
    const UserProfile = await UserProfileDataModel.findOne({ email: body.email });
    if (!UserProfile) {
      // Provide more context in the error message
      return NextResponse.json({ error: `User with email ${body.email} not found` }, { status: 404 });
    }

    // Update user's useraccount document.
    if (body.name) {
      UserProfile.name = body.name;
    }
    if (body.company) {
      UserProfile.company = body.company;
    }

    await UserProfile.save();

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
