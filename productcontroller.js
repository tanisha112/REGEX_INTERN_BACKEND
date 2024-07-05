const ProductCollection = require("../models/ProductSchema");
const mongoose = require("mongoose");
const productcontroller = async (req, res) => {
  try {
    const { id, name, category } = req.params;
    let productdata;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      productdata = await ProductCollection.findById(id);
    } else if (name) {
      const searchname = name.toLowerCase();
      productdata = await ProductCollection.find({
        name: { $regex: new RegExp(searchname, "i") },
      });
    } else if (category) {
      const searchcategory = category.toLowerCase();
      productdata = await ProductCollection.find({
        category: { $regex: new RegExp(searchcategory, "i") },
      });
    } else if (req.path.includes("/random")) {
      productdata = await ProductCollection.aggregate([
        { $sample: { size: 9 } },
      ]);
    } else if (req.path.includes("/categories")) {
      productdata = await ProductCollection.distinct("category");
    } else if (req.path.includes("/subcategories")) {
      productdata = await ProductCollection.aggregate([
        { $group: { _id: "$sub_category" } }, // Group by sub_category to get unique values
        { $project: { subcategory: "$_id" } }, // Project the grouped _id into subcategory
        { $sample: { size: 9 } }, // Randomly sample 9 of those unique subcategories
      ]);
    } else {
      productdata = await ProductCollection.find();
    }
    res.status(200).json(productdata);
  } catch (err) {
    {
      console.log(`Error in fetching  product`.bgRed.white);
      res.status(500).json({ data: "Error in product fetching" });
    }
  }
};
module.exports = productcontroller;
