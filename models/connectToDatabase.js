import mongoose from "mongoose";

const connections = {};

const connectToDatabase = async (dbName) => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in your environment variables");
  }

  if (!connections[dbName]) {
    const dbUri = `${process.env.MONGODB_URI}/${dbName}`;
    connections[dbName] = mongoose.createConnection(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  return connections[dbName];
};
