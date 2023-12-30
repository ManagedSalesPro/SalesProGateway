import { NextResponse } from "next/server";
import getCompanyDataModel from "/models/CompanyData";

export async function POST() {
  try {
    const CompanyData = await getCompanyDataModel();

    const industries = await CompanyData.distinct("companyIndustry");
    const softwareStacks = await CompanyData.distinct("softwareName");
    const hardwareStacks = await CompanyData.distinct("hardwareName");

    // Get only the numerical value for max and min employee count
    const maxEmployeeCountDoc = await CompanyData.findOne().sort({ companyEmployeeCount: -1 }).limit(1);
    const minEmployeeCountDoc = await CompanyData.findOne().sort({ companyEmployeeCount: 1 }).limit(1);
    const maxEmployeeCount = maxEmployeeCountDoc ? maxEmployeeCountDoc.companyEmployeeCount : null;
    const minEmployeeCount = minEmployeeCountDoc ? minEmployeeCountDoc.companyEmployeeCount : null;

    // Get city and state combinations
    const cityStateLocations = await CompanyData.aggregate([
      { $group: { _id: { city: "$companyHQCity", state: "$companyHQState" } } },
      { $project: { cityState: { $concat: ["$_id.city", ", ", "$_id.state"] } } },
      { $sort: { cityState: 1 } } // Optional: Sort alphabetically
    ]).then(results => results.map(item => item.cityState));

    // Get unique cities
    const cityLocations = await CompanyData.distinct("companyHQCity");

    // Get unique states
    const stateLocations = await CompanyData.distinct("companyHQState");

    return NextResponse.json({
      industries,
      softwareStacks,
      hardwareStacks,
      maxEmployeeCount,
      minEmployeeCount,
      cityStateLocations,
      cityLocations,
      stateLocations
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
