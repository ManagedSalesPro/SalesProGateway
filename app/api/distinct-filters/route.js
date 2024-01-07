import { NextResponse } from "next/server";
import getSearchResultCompanyDataModel from "../../../models/SearchResultCompany"; // Import your Mongoose model

export async function POST() {
  try {
    const CompanySearchResultModel = await getSearchResultCompanyDataModel();

    const industries = await CompanySearchResultModel.distinct("companyIndustry");
    const softwareStacks = await CompanySearchResultModel.distinct("softwareName");
    const hardwareStacks = await CompanySearchResultModel.distinct("hardwareName");

    // Get only the numerical value for max and min employee count
    const maxEmployeeCountDoc = await CompanySearchResultModel.findOne().sort({ companyEmployeeCount: -1 }).limit(1);
    const minEmployeeCountDoc = await CompanySearchResultModel.findOne().sort({ companyEmployeeCount: 1 }).limit(1);
    const maxEmployeeCount = maxEmployeeCountDoc ? maxEmployeeCountDoc.companyEmployeeCount : null;
    const minEmployeeCount = minEmployeeCountDoc ? minEmployeeCountDoc.companyEmployeeCount : null;

    // Get city and state combinations
    const cityStateLocations = await CompanySearchResultModel.aggregate([
      { $group: { _id: { city: "$companyHQCity", state: "$companyHQState" } } },
      { $project: { cityState: { $concat: ["$_id.city", ", ", "$_id.state"] } } },
      { $sort: { cityState: 1 } } // Optional: Sort alphabetically
    ]).then(results => results.map(item => item.cityState));

    // Get unique cities
    const cityLocations = await CompanySearchResultModel.distinct("companyHQCity");

    // Get unique states
    const stateLocations = await CompanySearchResultModel.distinct("companyHQState");

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
