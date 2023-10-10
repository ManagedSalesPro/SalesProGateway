import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Clients from "@/models/Clients";

export async function POST(req) {
    try {
        await connectMongo();
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

        // Fetch clients based on the query
        const clients = await Clients.find(query);

        // Respond with the search results
        return NextResponse.json(clients);
    } catch (error) {
        console.error("Error searching clients:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
