const Business = require("../models/Business");

// CREATE BUSINESS (ADMIN)
exports.createBusiness = async (req, res) => {
  try {
    const business = await Business.create(req.body);
    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL BUSINESSES (with search/filter)
// exports.getBusinesses = async (req, res) => {
//   try {
//     const { category, location, search } = req.query;

//     let query = {};

//     if (category) query.category = category;
//     if (location) query.location = location;

//     if (search) {
//       query.name = { $regex: search, $options: "i" };
//     }

//     const businesses = await Business.find(query);

//     res.json(businesses);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };
// exports.getBusinesses = async (req, res) => {
//   try {
//     const { page = 1, limit = 5, category, location, search } = req.query;

//     let query = {};

//     if (category) query.category = category;
//     if (location) query.location = location;
//     if (search) query.name = { $regex: search, $options: "i" };

//     const businesses = await Business.find(query)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const total = await Business.countDocuments(query);

//     res.json({
//       total,
//       page,
//       pages: Math.ceil(total / limit),
//       data: businesses,
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

exports.getBusinesses = async (req, res) => {
  try {
    const { page = 1, limit = 5, category, location, search, sort } = req.query;

    let query = {};

    if (category) query.category = category;
    if (location) query.location = location;
    if (search) query.name = { $regex: search, $options: "i" };

    let sortOption = {};

    if (sort === "rating") {
      sortOption = { averageRating: -1 }; // high to low
    } else if (sort === "latest") {
      sortOption = { createdAt: -1 };
    }

    const businesses = await Business.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Business.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: businesses,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET SINGLE BUSINESS
exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ msg: "Business not found" });
    }

    res.json(business);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};