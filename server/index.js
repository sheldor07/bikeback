const express = require("express");
const app = express();
const cors = require("cors");
const BodyParser = require("body-parser");
const { connectToDB } = require("./db/db.js");

app.use(express.json());

app.use(BodyParser.json());
const corsOptions = {
  origin: ["http://localhost:19006", "exp:/192.168.0.101:8081"], // Replace with the appropriate origin of your Expo Go app
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
const port = 3000 || process.env.PORT;

const userRouter = require("./routes/api/user");
const routeRouter = require("./routes/api/routes");

app.use("/api/user", userRouter);
app.use("/api/route", routeRouter);

app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error(error);
  }
});
try {
  connectToDB();
} catch (err) {
  console.error(err);
}
