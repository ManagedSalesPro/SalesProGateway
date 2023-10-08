// app/api/clientsearch/distinct/location.js
import { connectToDatabase } from '@/libs/mongo';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const locations = await db.collection('clients').distinct('location');
  res.json(locations);
}
