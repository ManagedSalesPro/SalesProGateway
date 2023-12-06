//Conect to mvp database.

use('mvp');

// Create collection, if it doesn't exist, and insert a document.

db.jobHardwareStack.insertOne
(
    {
        "hardwareName":"Virtual Machines (VM)"
    }
);