//Conect to mvp database.

use('staging_webscraped');

// Create collection, if it doesn't exist, and insert a document.

db.linkedinjobs_jobQualification.insertOne
(
    {
        "qualificationType":"Educational Focus",
        "qualificationName":"Computer Science"
    }
);