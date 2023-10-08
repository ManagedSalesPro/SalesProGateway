// app/api/clientsearch/distinct/softwareStack.js
import { connectToDatabase } from '@/libs/mongo';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const softwareStacks = await db.collection('clients').distinct('softwareStack');
  res.json(softwareStacks);
}
