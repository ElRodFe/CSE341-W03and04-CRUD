const express = require("express");
const router = express.Router();
const prophetsController = require("../Controllers/prophets");
const validator = require("../Validation/prophets")

// GET REQUESTS
router.get("/", prophetsController.getAll);
router.get("/:id", prophetsController.getById);

// POST REQUESTS
router.post("/", validator.validateProphet, prophetsController.createProphet);

//PUT REQUESTS
router.put("/:id", validator.validateProphet, prophetsController.updateProphet);

//DELETE REQUESTS
router.delete("/:id", prophetsController.deleteProphet);

module.exports = router;