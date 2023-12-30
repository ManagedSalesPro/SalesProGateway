// MongoDB Realm Function: Transform and load data from staging to companyData database
exports = async function(changeEvent) {
   try {
    // MongoDB service client
    const mongodb = context.services.get("mongodb-atlas");
  
    // References to the staging database collections
    const stagingDb = mongodb.db("staging_webscraped");
    const companiesCollection = stagingDb.collection("linkedinjobs_company");
    const jobsCollection = stagingDb.collection("linkedinjobs_job");
    const jobHardwareStackCollection = stagingDb.collection("linkedinjobs_jobHardwareStack");
    const jobSoftwareStackCollection = stagingDb.collection("linkedinjobs_jobSoftwareStack");
  
    // Reference to the production database collection
    const productionDb = mongodb.db("companyData");
    const transformedCompaniesCollection = productionDb.collection("transformed_companies");
  
    // Helper function to fetch and aggregate hardware and software names
    async function fetchAndAggregateHardwareSoftware(jobDocument) {
      const hardwarePromises = jobDocument.jobHardwareStackID.map(id =>
        jobHardwareStackCollection.findOne({ _id: id }).then(hardware => hardware.hardwareName)
      );
      const softwarePromises = jobDocument.jobSoftwareStackID.map(id =>
        jobSoftwareStackCollection.findOne({ _id: id }).then(software => software.softwareName)
      );
  
      const [hardwareNames, softwareNames] = await Promise.all([
        Promise.all(hardwarePromises),
        Promise.all(softwarePromises)
      ]);
  
      return { hardwareNames, softwareNames };
    }
  
    // The main function to transform and load the company data
    async function transformAndLoadCompanyData(companyId) {
      // Fetch the company data from the staging area
      const companyData = await companiesCollection.findOne({ _id: companyId });
      if (!companyData) {
        console.error("Company not found with ID:", companyId);
        return;
      }
  
      // Fetch all job postings for this company
      const jobDocuments = await jobsCollection.find({ companyID: companyId }).toArray();
  
      // Parallel fetching of all related hardware and software for each job
      const jobsAggregationPromises = jobDocuments.map(async jobDocument => {
        const { hardwareNames, softwareNames } = await fetchAndAggregateHardwareSoftware(jobDocument);
        return { jobTitle: jobDocument.jobTitle, hardwareNames, softwareNames };
      });
  
      // Wait for all job data to be aggregated
      const aggregatedJobsData = await Promise.all(jobsAggregationPromises);
  
      // Prepare the final document to be inserted into the production collection
      const transformedCompanyData = {
        _id: companyData._id, // Use the original ObjectId of the company
        name: companyData.companyName,
        headquartersCity: companyData.companyHQCity,
        headquartersState: companyData.companyHQState,
        employeeCount: parseInt(companyData.companyEmployeeCount.$numberInt),
        industry: companyData.companyIndustry,
        hardware: aggregatedJobsData.flatMap(job => job.hardwareNames),
        software: aggregatedJobsData.flatMap(job => job.softwareNames)
      };
  
      // Upsert the transformed document into the production collection
      await transformedCompaniesCollection.updateOne(
        { _id: companyId },
        { $set: transformedCompanyData },
        { upsert: true }
      );
    }
  
    // Check the source of the change event and proceed with transformation if it's a job update
    if (changeEvent.operationType === "insert" || changeEvent.operationType === "update") {
      const jobDocument = changeEvent.fullDocument;
      await transformAndLoadCompanyData(jobDocument.companyID);
    }
     return { success: true, message: "Data processed and upserted successfully" };
  }
  catch (error) {
    console.error("Error in function execution", error);
    // Return an error object that is EJSON serializable
    return { success: false, error: error.message };
  }
};
