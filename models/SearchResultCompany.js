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
    companyEmployeeCount: {
      type: Number,
      trim: true,
    },
    companyIndustry: {
      type: [String],
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
    softwareName: {
      type: [String],
      trim: true,
    },
    hardwareName: {
      type: [String],
      trim: true,
    }
    // Add more fields as needed
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'company' // Explicitly specifying the collection name
  }
);

// add plugin that converts mongoose to json
searchResultCompanySchema.plugin(toJSON);

const getSearchResultCompanyDataModel = async () => {
  const db = await connectToDatabase("clientdata");
  return db.model("SearchResultCompany", searchResultCompanySchema);
};

export default getSearchResultCompanyDataModel;