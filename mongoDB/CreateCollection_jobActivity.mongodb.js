//Conect to mvp database.

use('mvp');

// Create collection, if it doesn't exist, and insert a document.

db.jobActivity.insertOne
(
    {
        "_id":{"$oid":"656b9ee5c98a9afe1df9fe50"},
        "activityName":"Systems Administration"
    }
);