// app/api/clientsearch/distinct/hardwareStack.js
import { connectToDatabase } from '@/libs/mongo';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const hardwareStacks = await db.collection('clients').distinct('hardwareStack');
  res.json(hardwareStacks);
}
