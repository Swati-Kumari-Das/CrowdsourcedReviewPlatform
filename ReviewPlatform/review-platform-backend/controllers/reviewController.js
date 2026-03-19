const Review = require("../models/Review");
const Business = require("../models/Business");


// 📝 1. Submit Review (USER)
exports.createReview = async (req, res) => {
  try {
    const { businessId, rating, comment } = req.body;

    // ✅ handle optional image
    const image = req.file ? req.file.path : "";

    const review = await Review.create({
      userId: req.user.id,
      businessId,
      rating,
      comment,
      image,
    });

    res.status(201).json({
      msg: "Review submitted for approval",
      review,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 👀 2. Get Approved Reviews (PUBLIC)
exports.getReviewsByBusiness = async (req, res) => {
  try {
    const reviews = await Review.find({
      businessId: req.params.businessId,
      status: "approved",
    }).populate("userId", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🛠️ 3. Admin: Get Pending Reviews
exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "pending" })
      .populate("userId", "name")
      .populate("businessId", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ 4. Admin: Approve Review
exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    review.status = "approved";
    await review.save();

    // ⭐ Update average rating
    const reviews = await Review.find({
      businessId: review.businessId,
      status: "approved",
    });

    const avg =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Business.findByIdAndUpdate(review.businessId, {
      averageRating: avg,
    });

    res.json({ msg: "Review approved", review });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ❌ 5. Admin: Reject Review
exports.rejectReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    review.status = "rejected";
    await review.save();

    res.json({ msg: "Review rejected" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};