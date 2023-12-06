//Conect to mvp database.

use('mvp');

// Create collection, if it doesn't exist, and insert a document.

db.jobQualification.insertOne
(
    {
        "qualificationName":"Bachelor's Degree",
        "qualificationType":"Educational Attainment"
    }
);