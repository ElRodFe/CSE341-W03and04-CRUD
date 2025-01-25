const express = require("express");
const router = express.Router();
const apostlesController = require("../Controllers/apostles");
const validator = require("../Validation/apostles")

// GET REQUESTS
router.get("/", apostlesController.getAll);
router.get("/:id", apostlesController.getById);

// POST REQUESTS
router.post("/", validator.validateApostle, apostlesController.createApostle);

//PUT REQUESTS
router.put("/:id", validator.validateApostle, apostlesController.updateApostle);

//DELETE REQUESTS
router.delete("/:id", apostlesController.deleteApostle);

module.exports = router;