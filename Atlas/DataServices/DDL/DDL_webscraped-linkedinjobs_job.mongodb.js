//Conect to scrapeddata database.
use('scrapeddata');

// Create collection, if it doesn't exist, and insert a document.

db.linkedinjobs_job.insertOne
(
    {
        "jobTitle": "Administrator, Technology",
        "companyID": ObjectId("657a702bd572cbe1407b854d"),
        "jobCity": "Miami",
        "jobState": "Florida",
        "jobType": "Full-Time",
        "jobDescription":
        `"Administrator, Technology - 15245

        Description
        
        AAR Airframe MRO – Miami, an industry leading provider of aircraft maintenance, repair, overhaul services, airframe, and engine parts supplier is seeking an experienced Windows and VM Systems Administrator to join our dynamic IT team. The ideal candidate will have a proven track record in managing and optimizing Windows-based systems and virtualized environments. This role requires a strong understanding of system architecture, excellent troubleshooting skills, and the ability to implement and maintain robust technology solutions.
        
        RESPONSIBILITIES:
        
         Manage and administer Windows-based servers, ensuring their stability, security, and optimal performance. 
         Oversee the implementation, and maintenance of virtualized environments 
         Perform regular system updates, patches, and configurations to enhance system reliability and security. 
         Collaborate with cross-functional teams to deploy and support business-critical applications. 
         Monitor system performance and proactively address issues to minimize downtime. 
         Maintain backup and recovery systems for Windows servers and virtualized environments. 
         Troubleshoot hardware, software, and network-related issues in a timely manner. 
         Create and maintain documentation for system configurations, processes, and procedures. 
        
        Qualifications
        
         Qualifications 
        
         Bachelor’s degree in Computer Science, Information Technology, or related field. 
         Proven experience 5+ years as a Windows Systems Administrator and expertise in VM administration. Additional experience with Linux is a plus. 
         In-depth knowledge of Windows Server operating systems and Active Directory. 
         Robust understanding and experience with Azure Active Directory, Connect, Office365 and cloud services are a must. 
         Strong scripting skills (PowerShell, Python, etc.) for automation tasks. 
         Familiarity with storage solutions and networking protocols. 
         Excellent problem-solving and communication skills. 
         Relevant certifications (e.g., MCSE, VCP) are a plus. 
        
         Job  : Information Technology
        
         Primary Location  : United States-Florida-Miami
        
         Schedule  : Full-time
        
         Overtime Status  : Exempt`,
        "salaryTop": "Technology",
        "salaryBottom": "Technology",
        "salaryEst": "Technology",
        "jobSoftwareStackID": [ObjectId("657a6fdf8d241ee16e0c6302"), ObjectId("657a7087761bb3987ca5588f"), ObjectId("657a70904e4cc544d2ea6cfe")],
        "jobHardwareStackID": [ObjectId("657a6fc4a50dd99615be8a45"), ObjectId("657a70a080f9756f812fa753")],
        "jobQualificationID": [ObjectId("657a710022b37d8279108993"), ObjectId("657a713bab0e2b5af24c6615")],
        "jobActivityID": [ObjectId("657a6f4fe7e0878a4bfd8516"), ObjectId("657a70c601777a0723db622a")]
    }
)