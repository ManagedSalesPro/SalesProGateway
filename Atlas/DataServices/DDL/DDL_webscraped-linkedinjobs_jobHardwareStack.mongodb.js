//Conect to scrapeddata database.
use('scrapeddata');

// Create collection, if it doesn't exist, and insert a document.

db.linkedinjobs_jobHardwareStack.insertOne
(
    {
        "hardwareName":"Azure Cloud"
    }
);