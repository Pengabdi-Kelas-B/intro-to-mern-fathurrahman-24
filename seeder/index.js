const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");

async function main() {
  /**--------------- Not allowed to be edited - start - --------------------- */
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);
  const command = args[0];
  /**--------------- Not allowed to be edited - end - --------------------- */

  // Connect to MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define a schema for the collection
  const schema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: [String],
    description: String,
    director: String,
    cast: [String],
  }, { strict: false });

  const Model = mongoose.model(collection, schema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;

    case "bulk-insert":
      await bulkInsert(Model);
      console.log("Bulk Insert Berhasil");
      break;

    case "get-all":
      await getAll(Model);
      break;

    case "reset-db":
      await resetDb(Model);
      console.log("Reset Data Berhasil");
      break;

    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

async function bulkInsert(Model) {
  const data = JSON.parse(fs.readFileSync("seed.json", 'utf-8'));

  // Insert data into MongoDB using the Model
  await Model.insertMany(data);
}

async function getAll(Model) {
  const movieDataGetAll = await Model.find();
  console.log(movieDataGetAll);
  console.log("Get Data Berhasil");
}

async function resetDb(Model) {
  await Model.deleteMany();
}

main();
