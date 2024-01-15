import { NextResponse } from "next/server";
import getSearchResultCompanyDataModel from "../../../models/SearchResultCompany"; // Import your Mongoose model

export async function POST(req) {
    try {
        const filters = await req.json();

        const query = {};

        // Company Name
        if (filters.companyNames) {
            query.companyName = new RegExp(filters.companyName, 'i');
        }

        // Industry
         if (filters.companyIndustries && filters.companyIndustries.length) {
            query.companyIndustry = { $in: filters.companyIndustries };
        }

        // Location
        if (filters.companyLocations) {
            const locationParts = filters.companyLocations.split(',').map(part => part.trim());
            if (locationParts.length === 2) {
                // City and State are provided
                query.companyHQCity = new RegExp(locationParts[0], 'i');
                query.companyHQState = new RegExp(locationParts[1], 'i');
            } else if (locationParts.length === 1) {
                // Only City or State is provided
                query.$or = [
                    { companyHQCity: new RegExp(locationParts[0], 'i') },
                    { companyHQState: new RegExp(locationParts[0], 'i') }
                ];
            }
        }

        // Software Stack
        if (filters.softwareNames && filters.softwareNames.length) {
            query.softwareName = { $in: filters.softwareNames };
        }

        // Hardware Stack
        if (filters.hardwareNames && filters.hardwareNames.length) {
            query.hardwareName = { $in: filters.hardwareNames };
        }

        // Company Size
        if (filters.minCompanyEmployeeCount && filters.maxCompanyEmployeeCount) {
            query.companyEmployeeCount = {
                $gte: filters.minCompanyEmployeeCount,
                $lte: filters.maxCompanyEmployeeCount
            };
        }

        // Fetch companies based on the query
        const CompanySearchResultsDataModel = await getSearchResultCompanyDataModel();
        const CompanySearchResults = await CompanySearchResultsDataModel.find(query);

        // Respond with the search results
        return NextResponse.json(CompanySearchResults);
    } catch (error) {
        console.error("Error searching clients:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
