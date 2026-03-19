const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviewsByBusiness,
  getPendingReviews,
  approveReview,
  rejectReview,
} = require("../controllers/reviewController");

const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// 👇 ADD THESE
const { reviewLimiter } = require("../middleware/rateLimiter");
const { validate } = require("../middleware/validate");
const { reviewSchema } = require("../validators/reviewValidator");

// USER
router.post(
  "/",
  protect,
  reviewLimiter,          // 👈 ADD
  upload.single("image"),
  validate(reviewSchema), // 👈 ADD
  createReview
);

// PUBLIC
router.get("/:businessId", getReviewsByBusiness);

// ADMIN
router.get("/admin/pending", protect, admin, getPendingReviews);
router.put("/admin/approve/:id", protect, admin, approveReview);
router.put("/admin/reject/:id", protect, admin, rejectReview);

module.exports = router;