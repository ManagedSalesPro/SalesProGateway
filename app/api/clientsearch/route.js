// app/api/clientsearch.js

import { connectToDatabase } from "@/libs/mongo";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { filters } = req.body;

  // Apply filters to query the MongoDB collection
  const results = await db.collection("clients").find(filters).toArray();

  res.json(results);
};
