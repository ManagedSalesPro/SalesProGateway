//Conect to mvp database.

use('staging_webscraped');

// Create collection, if it doesn't exist, and insert a document.

db.linkedinjobs_jobHardwareStack.insertOne
(
    {
        "hardwareName":"Azure Cloud"
    }
);