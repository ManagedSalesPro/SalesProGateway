import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import connectToDatabase from "/models/connectToDatabase";


// USER SCHEMA
const userAccountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      private: false,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: false,
    },
    company: {
      type: String,
      trim: true,
      private: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'useraccount' // Explicitly specifying the collection name
  }
);

// add plugin that converts mongoose to json
userAccountSchema.plugin(toJSON);

const getUserAccountDataModel = async () => {
  const db = await connectToDatabase("accountdata");
  return db.model("UserAccount", userAccountSchema);
};

export default getUserAccountDataModel;
