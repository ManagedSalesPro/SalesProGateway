import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

// This route is used to update the logged in users profile.
// The API call is initiated by <ButtonEditProfile /> component
// Duplicate emails just return 200 OK
export async function POST(req) {
  await connectMongo();

  const body = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      // Provide more context in the error message
      return NextResponse.json({ error: `User with email ${body.email} not found` }, { status: 404 });
    }

    // Update user details
    Object.keys(body).forEach((key) => {
      user[key] = body[key];
    });

    await user.save();

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
