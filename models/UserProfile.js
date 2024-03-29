import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import connectToDatabase from "/models/connectToDatabase";


// USER SCHEMA
const userProfileSchema = mongoose.Schema(
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
userProfileSchema.plugin(toJSON);

const getUserProfileDataModel = async () => {
  const db = await connectToDatabase("accountdata");
  return db.model("UserProfile", userProfileSchema);
};

export default getUserProfileDataModel;
