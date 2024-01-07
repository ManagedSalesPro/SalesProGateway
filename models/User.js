import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import connectToDatabase from "/models/connectToDatabase";


// USER SCHEMA
const userSchema = mongoose.Schema(
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
    image: {
      type: String,
    },
    // Used in the Stripe webhook to identify the user in Stripe and later create Customer Portal or prefill user credit card details
    customerId: {
      type: String,
      validate(value) {
        return value.includes("cus_");
      },
    },
    // Used in the Stripe webhook. should match a plan in config.js file.
    priceId: {
      type: String,
      validate(value) {
        return value.includes("price_");
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'nextauth_users' // Explicitly specifying the collection name
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

const getUserModel = async () => {
  const db = await connectToDatabase("auth");
  return db.model("User", userSchema);
};

export default getUserModel;
