import Products from "../model/product.schema.js";
export default class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Products.find({}).populate("variants");

      return res.status(200).json({
        success: true,
        message: "Data fetched successfully.",
        data: products,
      });
    } catch (err) {
      console.error("Error occurred while fetching products.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }

  async addProduct(req, res) {
    try {
      const { name, description, price } = req.body;

      if (!name || !description || isNaN(price) || price === undefined) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided in the request",
        });
      }

      const product = await Products.create({
        name,
        description,
        price,
      });

      if (product) {
        return res.status(201).json({
          success: true,
          message: "Product added successfully.",
          data: product,
        });
      }
    } catch (err) {
      console.error("Error occurred while adding a product.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const product = await Products.findById(id).populate("variants");

      if (product) {
        return res.status(200).json({
          success: true,
          message: "Product fetched successfully.",
          data: product,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No product found with the given ID.",
        });
      }
    } catch (err) {
      console.error("Error occurred while fetching a product.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }
      const prod = await Products.findById(id);
      if (prod && prod.variants.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Please delete all the variants first before deleting this product.",
        });
      }
      const deletedProduct = await Products.findByIdAndDelete(id);

      if (deletedProduct) {
        return res.status(200).json({
          success: true,
          message: "Product deleted successfully.",
          data: deletedProduct,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No product found with the given ID.",
        });
      }
    } catch (err) {
      console.error("Error occurred while deleting a product.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Invalid product id",
        });
      }

      const { name, description, price } = req.body;
      const updatedData = {};

      if (price !== undefined && isNaN(price)) {
        return res.status(400).json({
          success: false,
          message: "Invalid price in the request",
        });
      }

      if (!name && !description && !price) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided in the request",
        });
      }

      if (name) {
        updatedData["name"] = name;
      }

      if (description) {
        updatedData["description"] = description;
      }

      if (price !== undefined) {
        updatedData["price"] = price;
      }

      const updatedProduct = await Products.findOneAndUpdate(
        { _id: id },
        { $set: updatedData },
        { new: true }
      );

      if (updatedProduct) {
        return res.status(200).json({
          success: true,
          message: "Product updated successfully.",
          data: updatedProduct,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No product found with the given Id.",
        });
      }
    } catch (err) {
      console.error("Error occurred while updating a product.", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error.",
      });
    }
  }
}
