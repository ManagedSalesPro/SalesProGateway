import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose"; // Assuming this properly connects to your MongoDB using Mongoose
import Clients from "@/models/Clients"; // Import your Mongoose model

export async function POST() {
  try {
    // Connect to MongoDB (assuming your connectMongo function handles this)
    await connectMongo();

  
    // Perform your operations on the "clients" collection
    const industries = await Clients.distinct("industry");
    const softwareStacks = await Clients.distinct("softwareStack");
    const hardwareStacks = await Clients.distinct("hardwareStack");
    const domains = await Clients.distinct("domain");


    // Respond with the appropriate data
    return NextResponse.json({ industries, softwareStacks, hardwareStacks, domains });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
