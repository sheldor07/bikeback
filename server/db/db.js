require("dotenv").config();
const mongoose = require("mongoose");
const connectionURI =
  process.env.MONGODB_URI

async function connectToDB() {
  try {
    mongoose
      .connect(connectionURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
module.exports = { connectToDB };
