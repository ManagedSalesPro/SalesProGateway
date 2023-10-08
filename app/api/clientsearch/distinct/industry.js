// app/api/clientsearch/distinct/industry.js
import { connectToDatabase } from '@/libs/mongo';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const industries = await db.collection('clients').distinct('industry');
  res.json(industries);
}
