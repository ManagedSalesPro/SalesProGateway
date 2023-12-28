import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose"; 
import CompanyData from "@/models/CompanyData"; 

export async function POST() {
  try {
    // Attempt to connect to the MongoDB database
    await connectMongo("searchfilter_app_data");

    // Perform operations on the "companyData" collection
    const industries = await CompanyData.distinct("companyIndustry");
    const softwareStacks = await CompanyData.distinct("softwareName");
    const hardwareStacks = await CompanyData.distinct("hardwareName");

    // Find max and min values for companyEmployeeCount
    const maxEmployeeCount = await CompanyData.find().sort({ companyEmployeeCount: -1 }).limit(1);
    const minEmployeeCount = await CompanyData.find().sort({ companyEmployeeCount: 1 }).limit(1);

    // Get unique combinations of city and state
    const cityStateLocations = await CompanyData.aggregate([
      { $group: { _id: { city: "$companyHQCity", state: "$companyHQState" } } },
      { $project: { cityState: { $concat: ["$_id.city", ", ", "$_id.state"] } } }
    ]);

    // Get unique states
    const stateLocations = await CompanyData.distinct("companyHQState");

    // Respond with the appropriate data
    return NextResponse.json({
      industries,
      softwareStacks,
      hardwareStacks,
      maxEmployeeCount: maxEmployeeCount[0]?.companyEmployeeCount,
      minEmployeeCount: minEmployeeCount[0]?.companyEmployeeCount,
      cityStateLocations: cityStateLocations.map(location => location.cityState),
      stateLocations
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
