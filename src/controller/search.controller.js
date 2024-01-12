import Products from "../model/product.schema.js";
import Variants from "../model/variant.schema.js";
export default class SearchController {
  async search(req, res) {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Search query is required.",
        });
      }
      const variant = await Variants.findOne({ name: query });
      const products = await Products.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { variants: variant ? variant._id : null },
        ],
      }).populate("variants");

      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found matching the search query.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Products found successfully.",
        data: products,
      });
    } catch (err) {
      console.error("Error occurred while searching for products.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }
}
