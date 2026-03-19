const User = require("../models/User");
const Business = require("../models/Business");
const Review = require("../models/Review");

exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const businesses = await Business.countDocuments();
    const pendingReviews = await Review.countDocuments({ status: "pending" });

    res.json({
      totalUsers: users,
      totalBusinesses: businesses,
      pendingReviews,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};