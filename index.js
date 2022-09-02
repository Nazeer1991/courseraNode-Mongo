const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log("Connected correctly to server");

  const db = client.db(dbname);
  dboper.insertDocument(
    db,
    { name: "vadonut", description: "Test" },
    "dishes",
    (result) => {
      console.log("Insert Document:\n", result.ops);
      dboper.findDocuments(db, "dishes", (docs) => {
        console.log("Found Documents:\n", docs);
        dboper.updateDocument(
          db,
          { name: "vadonut" },
          { description: "updated Test" },
          "dishes",
          (result) => {
            console.log("Updated Document:", result.result);
            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found Document", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection", result);
                client.close();
              });
            });
          }
        );
      });
    }
  );
});
