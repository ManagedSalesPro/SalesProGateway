//Conect to scrapeddata database.
use('scrapeddata');

// Create collection, if it doesn't exist, and insert a document.

db.linkedinjobs_jobQualification.insertOne
(
    {
        "qualificationType":"Educational Focus",
        "qualificationName":"Computer Science"
    }
);