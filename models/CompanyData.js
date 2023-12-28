import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// COMPANY DATA SCHEMA

const companyDataSchema = mongoose.Schema(
  {
    // Define your company data schema fields here
    _id: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    companyHQCity: {
      type: String,
      trim: true,
    },
    companyHQState: {
      type: String,
      trim: true,
    },
    companyEmployeeCount: {
      type: Number, // Assuming the employee count is a number
    },
    companyIndustry: {
      type: String,
      trim: true,
    },
    hardwareName: {
      type: [String],
      trim: true,
    },
    softwareName: {
      type: [String],
      trim: true,
    }
    // Add more fields as needed
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Add a plugin that converts mongoose to JSON
companyDataSchema.plugin(toJSON);

export default mongoose.models.CompanyData || mongoose.model("CompanyData", companyDataSchema);
