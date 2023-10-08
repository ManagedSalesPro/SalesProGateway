import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose"; // Assuming this properly connects to your MongoDB using Mongoose
import Client from "@/models/Client"; // Import your Mongoose model

export async function POST(req) {
  try {
    // Connect to MongoDB (assuming your connectMongo function handles this)
    await connectMongo();

    // Use your Mongoose model to work with the "clients" collection
    const clients = await Client.find({}); // Change this query as needed

    // Perform your operations on the "clients" collection
    const industries = [...new Set(clients.map((client) => client.industry))];
    const softwareStacks = [...new Set(clients.map((client) => client.softwareStack))];
    const hardwareStacks = [...new Set(clients.map((client) => client.hardwareStack))];
    const domains = [...new Set(clients.map((client) => client.domain))];

    // Respond with the appropriate data
    return NextResponse.json({ industries, softwareStacks, hardwareStacks, domains });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
