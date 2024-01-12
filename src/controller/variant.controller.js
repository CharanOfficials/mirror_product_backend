import Variants from "../model/variant.schema.js";
import Products from "../model/product.schema.js";
export default class VariantController {
  async addVariant(req, res) {
    try {
      const { name, sku_id, additional_cost, count, productId } = req.body;

      if (!productId) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid product id." });
      }

      if (
        !name ||
        !sku_id ||
        isNaN(additional_cost) ||
        additional_cost === undefined ||
        !count
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided in the request",
        });
      }

      if (sku_id) {
        const foundSku = await Variants.findOne({ sku_id });

        if (foundSku) {
          return res.status(400).json({
            success: false,
            message: "SKU id already exists",
          });
        }
      }

      const product = await Products.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const variant = await Variants.create({
        name,
        sku_id,
        additional_cost,
        stock_count: count,
        product: productId,
      });

      if (variant) {
        product.variants.push(variant._id);
        await product.save();

        return res.status(201).json({
          success: true,
          message: "Variant added successfully.",
          data: variant,
        });
      }
    } catch (err) {
      console.error("Error occurred while adding a variant.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }

  async deleteVariant(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid variant ID",
        });
      }

      const deletedVariant = await Variants.findByIdAndDelete(id);

      if (deletedVariant) {
        const product = await Products.findById(deletedVariant.product);

        if (product) {
          product.variants.pull(deletedVariant._id);
          await product.save();

          return res.status(200).json({
            success: true,
            message: "Variant deleted successfully.",
            data: deletedVariant,
          });
        } else {
          console.error(
            "Associated product not found for variant:",
            deletedVariant.product
          );
          return res.status(500).json({
            success: false,
            message: "Internal Server error.",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "No variant found with the given ID.",
        });
      }
    } catch (err) {
      console.error("Error occurred while deleting a variant.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }

  async updateVariant(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid variant id",
        });
      }

      const { name, additional_cost, count } = req.body;
      const updatedData = {};

      if (additional_cost !== undefined && isNaN(additional_cost)) {
        return res.status(400).json({
          success: false,
          message: "Invalid additional_cost in the request",
        });
      }

      if (!name && additional_cost === undefined && count === undefined) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided in the request",
        });
      }

      if (name) {
        updatedData["name"] = name;
      }

      if (additional_cost !== undefined) {
        updatedData["additional_cost"] = additional_cost;
      }

      if (count !== undefined) {
        updatedData["stock_count"] = count;
      }

      const updatedVariant = await Variants.findOneAndUpdate(
        { _id: id },
        { $set: updatedData },
        { new: true }
      );

      if (updatedVariant) {
        return res.status(200).json({
          success: true,
          message: "Variant updated successfully.",
          data: updatedVariant,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No variant found with the given Id.",
        });
      }
    } catch (err) {
      console.error("Error occurred while updating a variant.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }
}
