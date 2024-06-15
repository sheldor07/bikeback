const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Polyline = require("@mapbox/polyline");

const secretKey = process.env.SECRET_KEY;
// Function to handle user signup
async function signup(req, res) {
  const { email, password, userName } = req.body;
  if (!email || !password || !userName) {
    res
      .send({ success: true, error: "Email and password are required" })
      .status(400); // Bad Request
  }
  try {
    if (await User.findOne({ email })) {
      res
        .send({
          success: false,
          error: "An account already exists with this e-mail",
        })
        .status(400);
    }
    if (await User.findOne({ userName })) {
      res
        .send({
          success: false,
          error: "Account with this username already exists",
        })
        .status(400);
    }
    const user = await User.create({ userName, email, password });
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.send({ success: true, token: token, username: userName }).status(200);
    res.send({ success: true, userId: user._id }).status(200);
  } catch (err) {
    res.send({ success: false, error: err.message }).status(400);
  }
}

// Function to handle user login
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .send({ success: false, error: "Email and password are required" })
      .status(400); // Bad Request
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, secretKey);
        res
          .send({ success: true, token: token, username: user.userName })
          .status(200);
      } else {
        res
          .send({ success: false, error: "Password is incorrect" })
          .status(400);
      }
    } else {
      res.send({ success: false, error: "User doesn't exist" }).status(400);
    }
  } catch (err) {
    res.send({ success: false, error: err.message }).status(400);
  }
}

async function updatePassword(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  // Verify and decode the token
  const decodedToken = jwt.verify(token, secretKey);
  const userId = decodedToken.userId;
  const { currentPassword, newPassword } = req.body;
  if (!userId || !currentPassword || !newPassword) {
    res
      .send({
        success: false,
        error: "UserId, currentPassword and newPassword are required",
      })
      .status(400); // Bad Request
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      if (await bcrypt.compare(currentPassword, user.password)) {
        
        user.password = newPassword;
        await user.save();
        res.send({ success: true, message:"Updated password succesully?" }).status(200);
      } else {
        res
          .send({ success: false, error: "Current password is incorrect" })
          .status(400);
      }
    } else {
      res.send({ success: false, error: "User doesn't exist" }).status(400);
    }
  } catch (err) {
    res.send({ success: false, error: err.message }).status(400);
  }
}

async function updateUsername(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  // Verify and decode the token
  const decodedToken = jwt.verify(token, secretKey);
  const userId = decodedToken.userId;
  const { newUsername } = req.body;
  if (!userId || !newUsername) {
    res
      .send({ success: false, error: "UserId and newUsername are required" })
      .status(400); // Bad Request
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      user.userName = newUsername;
      await user.save();
      res.send({ success: true, message:"Updated password succesully?" }).status(200);
    } else {
      res.send({ success: false, error: "User doesn't exist" }).status(400);
    }
  } catch (err) {
    res.send({ success: false, error: err.message }).status(400);
  }
}
// Function to get all rides associated with a user
async function getRidesbyUserID(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  // Verify and decode the token
  const decodedToken = jwt.verify(token, secretKey);
  const userId = decodedToken.userId; // Assuming the user ID is stored in the 'userId' claim of the token  if (!userId) {
  if (!userId) {
    res.send({ success: false, error: "UserId is required" }).status(400); // Bad Request
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.send({ success: true, rideHistory: user.rideHistory }).status(200);
    } else {
      res.send({ success: false, error: "User doesn't exist" }).status(400);
    }
  } catch (err) {
    res.send({ success: false, error: err.message }).status(400);
  }
}

// Function to get a specific ride by its ID
async function getRideByRideID(req, res) {
  const { userId } = req.query;
  const { rideId } = req.params;
  try {
    // Find the user by their ID and retrieve the specific ride from rideHistory
    const user = await User.findOne(
      { _id: userId },
      { rideHistory: { $elemMatch: { _id: rideId } } }
    );

    if (!user) {
      return res.status(404).send({ success: false, error: "User not found" });
    }

    const ride = user.rideHistory[0];

    if (!ride) {
      return res.status(404).send({ success: false, error: "Ride not found" });
    }

    res.send({ success: true, ride }).status(200);
  } catch (err) {
    res.send({ success: false, error: err.message }).status(400);
  }
}
// Function to save a new ride for the user
async function saveRide(req, res) {
  // ...
  // Create a new ride with the userId set to the logged-in user's id and other details from the request body
  const token = req.headers.authorization.split(" ")[1];

  const { duration, distance, averageSpeed, coordinates, destination } =
    req.body;
  const decodedToken = jwt.verify(token, secretKey);
  const userId = decodedToken.userId;
  if (!userId || !duration || !distance || !averageSpeed || !coordinates) {
    res
      .send({
        success: false,
        error:
          "userId, duration, distance, averageSpeed, and polygon are required",
      })
      .status(400);
  }
  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ success: false, error: "User not found" });
    }

    // Create a new ride document
    const newRide = {
      duration,
      distance,
      averageSpeed,
      coordinates,
      destination,
    };

    // Add the new ride to the user's rideHistory array
    user.rideHistory.push(newRide);

    // Save the updated user document
    await user.save();

    res.send({ success: true, message: "Ride saved successfully" }).status(200);
  } catch (err) {
    res.send({ success: false, error: err.message }).status(400);
  }
}

// Export the functions for use in other parts of the application
module.exports = {
  signup,
  login,
  updatePassword,
  getRidesbyUserID,
  getRideByRideID,
  saveRide,
  updateUsername,
};
