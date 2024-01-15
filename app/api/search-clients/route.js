import { NextResponse } from "next/server";
import getSearchResultCompanyDataModel from "../../../models/SearchResultCompany"; // Import your Mongoose model

export async function POST(req) {
    try {
        const filters = await req.json();

        const query = {};

        // Company Name
        if (filters.companyName) {
            query.companyName = new RegExp(filters.companyName, 'i');
        }

        // Location
        if (filters.location) {
            query.location = filters.location;
        }

        // Industry
        if (filters.industry && filters.industry.length) {
            query.industry = { $in: filters.industry };
        }

        // Domain
        if (filters.domain && filters.domain.length) {
            query.domain = { $in: filters.domain };
        }

        // Software Stack
        if (filters.softwareStack && filters.softwareStack.length) {
            query.softwareStack = { $in: filters.softwareStack };
        }

        // Hardware Stack
        if (filters.hardwareStack && filters.hardwareStack.length) {
            query.hardwareStack = { $in: filters.hardwareStack };
        }

        // Estimated Revenue
        if (filters.minEstimatedRevenue && filters.maxEstimatedRevenue) {
            query.estimatedRevenue = {
                $gte: filters.minEstimatedRevenue,
                $lte: filters.maxEstimatedRevenue
            };
        }

        // Company Size
        if (filters.minCompanySize && filters.maxCompanySize) {
            query.companySize = {
                $gte: filters.minCompanySize,
                $lte: filters.maxCompanySize
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
