const express = require("express");
const router = express.Router();

const {
  createBusiness,
  getBusinesses,
  getBusinessById,
} = require("../controllers/businessController");

const { protect, admin } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getBusinesses);
router.get("/:id", getBusinessById);

// ADMIN
router.post("/", protect, admin, createBusiness);

module.exports = router;