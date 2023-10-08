// app/api/clientsearch/route.js
import { connectToDatabase } from '@/libs/mongo';

export default async function handler(req, res) {
  const { query, location, companySize, industry, revenue, softwareStack, hardwareStack } = req.query;
  const { db } = await connectToDatabase();

  // Implement search logic using MongoDB queries
  const filterCriteria = {
    name: query,
    location,
    companySize: { $gte: companySize },
    industry: { $in: industry },
    revenue: { $gte: revenue },
    softwareStack: { $in: softwareStack },
    hardwareStack: { $in: hardwareStack }
  };
  const results = await db.collection('clients').find(filterCriteria).toArray();

  res.json(results);
}
