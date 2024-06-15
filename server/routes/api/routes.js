const express = require("express");
const router = express.Router();

const {
  createRouteLeisureMode,
  createRouteDestinationMode,
} = require("../../controllers/routes");

router.post("/destination", createRouteDestinationMode);
router.post("/leisure", createRouteLeisureMode);

module.exports = router;
