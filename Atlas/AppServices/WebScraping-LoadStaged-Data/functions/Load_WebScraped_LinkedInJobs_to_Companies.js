// MongoDB Atlas Function Code
exports = async function() {
  // Reference to the MongoDB service
  const mongodb = context.services.get("mongodb-atlas");
  
  // Reference to the source database
  const sourceDb = mongodb.db('staging_webscraped');

  // Read data from source collections
  const companies = await sourceDb.collection('linkedinjobs_company').find().toArray();
  const jobs = await sourceDb.collection('linkedinjobs_job').find().toArray();
  const hardwareStack = await sourceDb.collection('linkedinjobs_jobHardwareStack').find().toArray();
  const softwareStack = await sourceDb.collection('linkedinjobs_jobSoftwareStack').find().toArray();
  
  // Transform company data and associate hardware and software
  let transformedCompanies = companies.map(company => {
    // Find related jobs for the company
    let companyJobs = jobs.filter(job => job.companyID.$oid === company._id.$oid);

    // Extract and deduplicate hardware and software IDs from company's jobs
    let hardwareIds = [...new Set(companyJobs.flatMap(job => job.jobHardwareStackID.map(hs => hs.$oid)))];
    let softwareIds = [...new Set(companyJobs.flatMap(job => job.jobSoftwareStackID.map(ss => ss.$oid)))];

    // Find and associate the hardware and software names
    let associatedHardware = hardwareStack.filter(hw => hardwareIds.includes(hw._id.$oid));
    let associatedSoftware = softwareStack.filter(sw => softwareIds.includes(sw._id.$oid));

    return {
      _id: company._id,
      name: company.companyName,
      headquartersCity: company.companyHQCity,
      headquartersState: company.companyHQState,
      employeeCount: parseInt(company.companyEmployeeCount.$numberInt),
      industry: company.companyIndustry,
      hardware: associatedHardware.map(hw => hw.hardwareName),
      software: associatedSoftware.map(sw => sw.softwareName),
    };
  });

  // Reference to the target database
  const targetDb = mongodb.db('companyData');
  
  // Write transformed data to target database
  for (const company of transformedCompanies) {
    await targetDb.collection('transformed_companies').insertOne(company);
  }

  return { result: "Data transformed and inserted successfully" };
};
