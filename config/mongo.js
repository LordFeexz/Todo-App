const { MongoClient, ObjectId } = require("mongodb");

const uri = `mongodb+srv://Feexz:Ananda1403@cluster0.424yaki.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let db = null;

async function mongoConnect() {
  try {
    return (db = client.db("Users"));
  } catch (err) {
    return err;
  }
}

function getDb() {
  return db;
}

module.exports = {
  mongoConnect,
  getDb,
  ObjectId,
};
