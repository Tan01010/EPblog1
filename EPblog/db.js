const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.CONNECTIONSTRING);

async function start() {
  await client.connect();
  const db = client.db(); // Get the database instance
  module.exports = db; // Export the database instance
  const app = require('./index');
  app.listen(process.env.PORT);
}

start().catch((err) => {
  console.error(err);
});