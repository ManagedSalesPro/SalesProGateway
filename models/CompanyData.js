import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import connectToDatabase from "/models/connectToDatabase"; // Adjust the path as needed


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

const getCompanyDataModel = async () => {
  const db = await connectToDatabase("searchfilter_app_data");
  return db.model("CompanyData", companyDataSchema);
};

export default getCompanyDataModel;