import mongoose from "mongoose";

const connectMongo = async (dbName) => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "Add the MONGODB_URI environment variable inside .env.local to use mongoose"
    );
  }
  const dbUri = dbName ? `${process.env.MONGODB_URI}/${dbName}` : `${process.env.MONGODB_URI}/next-auth`;
  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((e) => console.error("Mongoose Client Error: " + e.message));
};

export default connectMongo;
