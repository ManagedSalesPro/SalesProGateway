import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// CLIENT SCHEMA
const clientSchema = mongoose.Schema(
  {
    // Define your client schema fields here
    industry: {
      type: String,
      trim: true,
    },
    softwareStack: {
      type: String,
      trim: true,
    },
    hardwareStack: {
      type: String,
      trim: true,
    },
    domain: {
      type: String,
      trim: true,
    },
    // Add more fields as needed
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add a plugin that converts mongoose to JSON
clientSchema.plugin(toJSON);

export default mongoose.models.Client || mongoose.model("Client", clientSchema);
