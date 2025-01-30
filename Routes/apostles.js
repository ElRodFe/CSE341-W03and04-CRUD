const express = require("express");
const router = express.Router();
const apostlesController = require("../Controllers/apostles");
const validator = require("../Validation/apostles")
const authenticator = require("../Middleware/authenticate");

// GET REQUESTS
router.get("/", apostlesController.getAll);
router.get("/:id", apostlesController.getById);

// POST REQUESTS
router.post("/", authenticator.isAuthenticated, validator.validateApostle, apostlesController.createApostle);

//PUT REQUESTS
router.put("/:id", authenticator.isAuthenticated, validator.validateApostle, apostlesController.updateApostle);

//DELETE REQUESTS
router.delete("/:id", authenticator.isAuthenticated, apostlesController.deleteApostle);

module.exports = router;