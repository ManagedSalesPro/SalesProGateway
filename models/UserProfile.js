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
    collection: 'user_details' // Explicitly specifying the collection name
  }
);

// add plugin that converts mongoose to json
userProfileSchema.plugin(toJSON);

const getUserProfile = async () => {
  const db = await connectToDatabase("accounts_data");
  return db.model("UserProfile", userSchema);
};

export default getUserProfile;
