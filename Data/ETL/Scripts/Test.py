# Connect to MongoDB Atlas
from pymongo import MongoClient

# MongoDB connection settings
mongo_uri = "mongodb+srv://abreham:FxOs0Cji3b7q4PIz@preview.rf8ucdr.mongodb.net/staging_webscraped"
client = MongoClient(mongo_uri)

# Define source and target databases and collections
source_db = client.staging_webscraped
target_db = client.searchfilter_app_data
target_collection = target_db.companyData

# Clear existing data in the target collection (optional)
target_collection.delete_many({})

# Iterate over the linkedinjobs_company collection
for company_document in source_db.linkedinjobs_company.find():
    # Extract company-level data
    company_data = {
        'companyName': company_document['companyName'],
        'companyHQCity': company_document['companyHQCity'],
        'companyHQState': company_document['companyHQState'],
        'companyEmployeeCount': company_document['companyEmployeeCount'],
        'companyIndustry': company_document['companyIndustry'],
        'hardwareName': [],  # Initialize an empty list for hardwareName
        'softwareName': []  # Initialize an empty list for softwareName
    }

    # Define a filter to identify the relevant job documents associated with the company
    filter_query = {'companyID': company_document['_id']}

    # Iterate over linkedinjobs_job collection to collect job IDs associated with the company
    job_ids = [job['_id'] for job in source_db.linkedinjobs_job.find(filter_query)]
    
    # Separate lists for jobHardwareStackIDs and jobSoftwareStackIDs
    jobHardwareStackIDs = []
    jobSoftwareStackIDs = []

    for job_document in source_db.linkedinjobs_job.find(filter_query):
        if 'jobHardwareStackID' in job_document:
            jobHardwareStackIDs.extend(job_document['jobHardwareStackID'])
        if 'jobSoftwareStackID' in job_document:
            jobSoftwareStackIDs.extend(job_document['jobSoftwareStackID'])

    # Iterate over linkedinjobs_jobHardwareStack collection to collect hardware data
    for hardware_document in source_db.linkedinjobs_jobHardwareStack.find({'_id': {'$in': jobHardwareStackIDs}}):
        if 'hardwareName' in hardware_document:
            company_data['hardwareName'].append(hardware_document['hardwareName'])

    # Iterate over linkedinjobs_jobSoftwareStack collection to collect software data
    for software_document in source_db.linkedinjobs_jobSoftwareStack.find({'_id': {'$in': jobSoftwareStackIDs}}):
        if 'softwareName' in software_document:
            company_data['softwareName'].append(software_document['softwareName'])

    # Insert the company data with associated hardware and software into the target collection
    target_collection.insert_one(company_data)

# Close the MongoDB client connection
client.close()

print("Data transfer completed.")