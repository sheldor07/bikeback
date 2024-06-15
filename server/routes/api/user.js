const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
var db = require("../../index");
const saltRounds = 10;

const {
  signup,
  login,
  getRideByRideID,
  getRidesbyUserID,
  saveRide,
  updatePassword,
  updateUsername
} = require("../../controllers/user");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot", updatePassword);
router.post("/change-username", updateUsername);
router.get("/rides", getRidesbyUserID);
router.get("/rides/:rideId", getRideByRideID);

router.post("/rides/save", saveRide);

module.exports = router;
