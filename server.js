var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var HITS_COLLECTION = "Hits";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
var mongoURI = "mongodb://agentgadget:squad@ds151461.mlab.com:51461/media";

//connect to the database before starting the application server.
mongodb.MongoClient.connect(mongoURI,function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/hits"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/hits", function(req, res) {
  db.collection(HITS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get entries.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/hits", function(req, res) {
  var newHit = req.body;
  newHit.createDate = new Date();

  if (!req.body.organization) {
    handleError(res, "Invalid user input", "Must provide an organization name.", 400);
  }

  db.collection(HITS_COLLECTION).insertOne(newHit, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/hits/:id", function(req, res) {
  db.collection(HITS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get entry");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/hits/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(HITS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update entry");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/hits/:id", function(req, res) {
  db.collection(HITS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete entry");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
/** structure{
 * "_id": "ObjectId",
    "Sr": "integer",
    "Date": "string",
    "Organization": "string",
    "Title": "string",
    "Link": "string",
    "Media Type": "string",
    "Article Type": "string",
    "Length (TV/Radio)": "string",
    "Circulation": "integer",
    "Jama'at": "string",
    "Writer": "string",
} */