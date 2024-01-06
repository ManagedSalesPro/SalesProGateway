import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import connectToDatabase from "/models/connectToDatabase";

// LEAD SCHEMA is used to store the leads that are generated from the landing page.
// You would use this if your product isn't ready yet and you want to collect emails
// The <ButtonLead /> component & the /api/lead route are used to collect the emails
const waitListLeadSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'waitlist_leads' // Explicitly specifying the collection name
  }
);

// add plugin that converts mongoose to json
waitListLeadSchema.plugin(toJSON);

const getWaitListLeadModel = async () => {
  const db = await connectToDatabase("sales");
  return db.model("WaitlistLead", waitListLeadSchema);
};

export default getWaitListLeadModel;