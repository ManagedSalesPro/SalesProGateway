import pandas as pd
from pymongo import MongoClient
from bson import ObjectId

# MongoDB Atlas Connection String and Database Name
MONGO_URI = 'mongodb+srv://abreham:FxOs0Cji3b7q4PIz@development.zlsu7dq.mongodb.net/scrapeddata'
DATABASE_NAME = 'scrapeddata'

# Excel File Path
EXCEL_FILE_PATH = 'Data/ETL/Inputs/clients_firt_100_input_file.xlsx'

# Establish MongoDB Connection
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

# Function to read excel sheet and return a dataframe
def read_sheet(excel_path, sheet_name):
    return pd.read_excel(excel_path, sheet_name=sheet_name)

# Function to check for existing records and use their ObjectId
def check_and_load(df, collection_name, db, name_field):
    collection = db[collection_name]
    ids = []
    for index, row in df.iterrows():
        existing_record = collection.find_one({name_field: row[name_field]})
        if existing_record:
            ids.append(existing_record['_id'])
        else:
            result = collection.insert_one(row.to_dict())
            ids.append(result.inserted_id)
    return ids

# Function to update job dataframe with MongoDB ObjectId references
def update_job_df_with_references(job_df, ref_ids, ref_field, id_field):
    def safe_ref_lookup(x):
        if pd.isna(x):
            return []
        result = []
        for i in str(x).split(','):
            if i.isdigit():
                idx = int(i) - 1  # Convert to zero-based index
                if 0 <= idx < len(ref_ids):
                    result.append(ref_ids[idx])
                else:
                    # Handle out-of-range index
                    print(f"Warning: Index {idx} out of range for value {x}")
                    result.append(None)
        return result
    job_df[ref_field] = job_df[id_field].apply(safe_ref_lookup)

# Function to load data into MongoDB collection
def load_data(df, collection_name, db):
    collection = db[collection_name]
    collection.delete_many({})
    records = df.to_dict('records')
    collection.insert_many(records)

# Read each sheet into a dataframe
job_df = read_sheet(EXCEL_FILE_PATH, 'job')
company_df = read_sheet(EXCEL_FILE_PATH, 'company')
job_software_stack_df = read_sheet(EXCEL_FILE_PATH, 'jobSoftwareStack')
job_hardware_stack_df = read_sheet(EXCEL_FILE_PATH, 'jobHardwareStack')
job_qualification_df = read_sheet(EXCEL_FILE_PATH, 'jobQualification')
job_activity_df = read_sheet(EXCEL_FILE_PATH, 'jobActivity')

# Remove ID fields from dataframes
job_df = job_df.drop(columns=['jobID'])  # Exclude jobID as it should not be uploaded
job_software_stack_df = job_software_stack_df[['softwareName']]
job_hardware_stack_df = job_hardware_stack_df[['hardwareName']]
job_qualification_df = job_qualification_df[['qualificationType', 'qualificationName']]
job_activity_df = job_activity_df[['activityName']]
company_df = company_df[['companyName', 'companyHQCity', 'companyHQState', 'companyDescription', 'companyWebsiteURL', 'companyEmployeeCount', 'companyIndustry']]

# Check for existing records and get ObjectId references
software_stack_ids = check_and_load(job_software_stack_df, 'linkedinjobs_jobSoftwareStack', db, 'softwareName')
hardware_stack_ids = check_and_load(job_hardware_stack_df, 'linkedinjobs_jobHardwareStack', db, 'hardwareName')
qualification_ids = check_and_load(job_qualification_df, 'linkedinjobs_jobQualification', db, 'qualificationName')
activity_ids = check_and_load(job_activity_df, 'linkedinjobs_jobActivity', db, 'activityName')
company_ids = check_and_load(company_df, 'linkedinjobs_company', db, 'companyName')

# Update the job dataframe with the ObjectId references
update_job_df_with_references(job_df, software_stack_ids, 'jobSoftwareStackID', 'jobSoftwareStackID')
update_job_df_with_references(job_df, hardware_stack_ids, 'jobHardwareStackID', 'jobHardwareStackID')
update_job_df_with_references(job_df, qualification_ids, 'jobQualificationID', 'jobQualificationID')
update_job_df_with_references(job_df, activity_ids, 'jobActivityID', 'jobActivityID')
update_job_df_with_references(job_df, company_ids, 'companyID', 'companyID')

# Load the job data into the MongoDB collection
load_data(job_df, 'linkedinjobs_job', db)