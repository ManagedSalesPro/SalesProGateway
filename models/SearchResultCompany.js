import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import connectToDatabase from "/models/connectToDatabase";


// CLIENT SCHEMA
const searchResultCompanySchema = mongoose.Schema(
  {
    // Define your client schema fields here
    _id: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    companySize: {
      type: Number,
      trim: true,
    },
    industry: {
      type: [String],
      trim: true,
    },
    domain: {
      type: [String],
      trim: true,
    },
    estimatedRevenue: {
      type: Number,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    softwareStack: {
      type: [String],
      trim: true,
    },
    hardwareStack: {
      type: [String],
      trim: true,
    }
    // Add more fields as needed
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'user_details' // Explicitly specifying the collection name
  }
);

// add plugin that converts mongoose to json
searchResultCompanySchema.plugin(toJSON);

const getSearchResultCompanyDataModel = async () => {
  const db = await connectToDatabase("company_data");
  return db.model("SearchResultCompany", searchResultCompanySchema);
};

export default getSearchResultCompanyDataModel;