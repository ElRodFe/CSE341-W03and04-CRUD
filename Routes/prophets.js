const express = require("express");
const router = express.Router();
const prophetsController = require("../Controllers/prophets");
const validator = require("../Validation/prophets");
const authenticator = require("../Middleware/authenticate");

// GET REQUESTS
router.get("/", prophetsController.getAll);
router.get("/:id", prophetsController.getById);

// POST REQUESTS
router.post("/", authenticator.isAuthenticated, validator.validateProphet, prophetsController.createProphet);

//PUT REQUESTS
router.put("/:id", authenticator.isAuthenticated, validator.validateProphet, prophetsController.updateProphet);

//DELETE REQUESTS
router.delete("/:id", authenticator.isAuthenticated, prophetsController.deleteProphet);

module.exports = router;