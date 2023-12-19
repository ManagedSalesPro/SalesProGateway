import pandas as pd
from pymongo import MongoClient
from bson import ObjectId

# MongoDB Atlas Connection String and Database Name
MONGO_URI = 'mongodb+srv://abreham:FxOs0Cji3b7q4PIz@preview.rf8ucdr.mongodb.net/staging_webscraped'
DATABASE_NAME = 'staging_webscraped'

# Excel File Path
EXCEL_FILE_PATH = 'testFiles/clients_firt_100_input_file.xlsx'

# Establish MongoDB Connection
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]


# Function to Import Data and Create or Retrieve ID Mapping
def import_data_and_create_mapping(sheet_name, collection_name, db, unique_field):
    df = pd.read_excel(EXCEL_FILE_PATH, sheet_name=sheet_name)
    records = df.to_dict(orient='records')
    collection = db[collection_name]

    # Insert records and create a mapping from unique_field to MongoDB ObjectId
    id_mapping = {}
    for record in records:
        unique_value = record.get(unique_field)
        existing_record = collection.find_one({unique_field: unique_value})
        if existing_record:
            # If record exists, use its ObjectId
            id_mapping[unique_value] = existing_record['_id']
        else:
            # Insert new record and map its ObjectId
            result = collection.insert_one(record)
            id_mapping[unique_value] = result.inserted_id

    return id_mapping

# Function to Replace IDs in Job Sheet with MongoDB ObjectIDs
def replace_ids_with_objectids(df, id_mappings):
    for col in ['jobSoftwareStackID', 'jobHardwareStackID', 'jobQualificationID', 'jobActivityID']:
        if col in df.columns:
            def process_id(x):
                if x is None or (isinstance(x, float) and pd.isna(x)):
                    return []
                result = []
                for id_str in str(x).split(','):
                    id_str = id_str.strip()
                    if id_str.isdigit():
                        mapped_id = id_mappings.get(int(id_str))
                        if mapped_id:
                            result.append(mapped_id)
                return result
            df[col] = df[col].apply(process_id)

    # Special handling for 'companyID' as a single relationship
    if 'companyID' in df.columns:
        df['companyID'] = df['companyID'].apply(
            lambda x: id_mappings.get(int(float(x))) if pd.notna(x) and str(x).strip().isdigit() else None
        )

    return df





# Import Related Data and Create ID Mappings
software_stack_mapping = import_data_and_create_mapping('jobSoftwareStack', 'linkedinjobs_jobSoftwareStack', db, 'softwareName')
hardware_stack_mapping = import_data_and_create_mapping('jobHardwareStack', 'linkedinjobs_jobHardwareStack', db, 'hardwareName')
qualification_mapping = import_data_and_create_mapping('jobQualification', 'linkedinjobs_jobQualification', db, 'qualificationName')
activity_stack_mapping = import_data_and_create_mapping('jobActivity', 'linkedinjobs_jobActivity', db, 'activityName')
company_mapping = import_data_and_create_mapping('company', 'linkedinjobs_company', db, 'CompanyName')

# Import Job Data with Replaced IDs
job_df = pd.read_excel(EXCEL_FILE_PATH, sheet_name='job')
job_df = replace_ids_with_objectids(job_df, software_stack_mapping)
job_df = replace_ids_with_objectids(job_df, hardware_stack_mapping)
job_df = replace_ids_with_objectids(job_df, qualification_mapping)
job_df = replace_ids_with_objectids(job_df, activity_stack_mapping)
job_df = replace_ids_with_objectids(job_df, company_mapping)

job_records = job_df.to_dict(orient='records')
db.linkedinjobs_job.insert_many(job_records)

# Close MongoDB Connection
client.close()
