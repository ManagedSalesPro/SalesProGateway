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
    
     // Find max and min values for estimatedRevenue
     const maxEstimatedRevenue = await Clients.find().sort({ estimatedRevenue: -1 }).limit(1);
     const minEstimatedRevenue = await Clients.find().sort({ estimatedRevenue: 1 }).limit(1);

     // Find max and min values for companySize
     const maxCompanySize = await Clients.find().sort({ companySize: -1 }).limit(1);
     const minCompanySize = await Clients.find().sort({ companySize: 1 }).limit(1);


    // Respond with the appropriate data
    return NextResponse.json({ 
      industries,
      softwareStacks,
      hardwareStacks,
      domains,
      maxEstimatedRevenue: maxEstimatedRevenue[0]?.estimatedRevenue,
      minEstimatedRevenue: minEstimatedRevenue[0]?.estimatedRevenue,
      maxCompanySize: maxCompanySize[0]?.companySize,
      minCompanySize: minCompanySize[0]?.companySize
    });
  } catch (error)  {
    console.error("Detailed Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
