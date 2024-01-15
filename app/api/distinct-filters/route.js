import { NextResponse } from "next/server";
import getSearchResultCompanyDataModel from "../../../models/SearchResultCompany"; // Import your Mongoose model

export async function POST() {
  try {
    const CompanySearchResultModel = await getSearchResultCompanyDataModel();

    // Filter out null values from distinct queries
    const industries = (await CompanySearchResultModel.distinct("companyIndustry")).filter(Boolean);
    const softwareName = (await CompanySearchResultModel.distinct("softwareName")).filter(Boolean);
    const hardwareName = (await CompanySearchResultModel.distinct("hardwareName")).filter(Boolean);

    // Get only the numerical value for max and min employee count
    const maxEmployeeCountDoc = await CompanySearchResultModel.findOne().sort({ companyEmployeeCount: -1 }).limit(1);
    const minEmployeeCountDoc = await CompanySearchResultModel.findOne().sort({ companyEmployeeCount: 1 }).limit(1);
    const maxEmployeeCount = maxEmployeeCountDoc ? maxEmployeeCountDoc.companyEmployeeCount : 0; // Default to 0 if null
    const minEmployeeCount = minEmployeeCountDoc ? minEmployeeCountDoc.companyEmployeeCount : 0; // Default to 0 if null

    // Get city and state combinations
    const cityStateLocations = (await CompanySearchResultModel.aggregate([
      { $group: { _id: { city: "$companyHQCity", state: "$companyHQState" } } },
      { 
        $project: { 
          cityState: {
            $cond: {
              if: { $and: ["$_id.city", "$_id.state"] },
              then: { $concat: [{ $toString: "$_id.city" }, ", ", { $toString: "$_id.state" }] },
              else: {
                $cond: {
                  if: "$_id.city",
                  then: { $toString: "$_id.city" },
                  else: { $toString: "$_id.state" }
                }
              }
            }
          } 
        } 
      },
      { $sort: { cityState: 1 } } // Optional: Sort alphabetically
    ])).filter(item => item.cityState && item.cityState !== 'NaN').map(item => item.cityState); // Filter out invalid values


    // Filter out null values from distinct queries
    const cityLocations = (await CompanySearchResultModel.distinct("companyHQCity")).filter(Boolean);
    const stateLocations = (await CompanySearchResultModel.distinct("companyHQState")).filter(Boolean);


    return NextResponse.json({
      industries,
      softwareName,
      hardwareName,
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
