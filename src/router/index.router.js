import express from "express";
import UserController from "../controller/user.controller.js";
import validateUser from "../middleware/auth.middleware.js";
import ProductController from "../controller/product.controller.js";
import VariantController from "../controller/variant.controller.js";
import SearchController from "../controller/search.controller.js";
const router = express.Router();
const userController = new UserController();
const productController = new ProductController();
const variantController = new VariantController();
const searchController = new SearchController();
router.get("/api/products", validateUser, (req, res) => {
  productController.getProducts(req, res);
});
router.get("/api/product/:id", validateUser, (req, res) => {
  productController.getProduct(req, res);
});
router.post("/api/products", validateUser, (req, res) => {
  productController.addProduct(req, res);
});
router.delete("/api/product/:id", validateUser, (req, res) => {
  productController.deleteProduct(req, res);
});
router.put("/api/product/:id", validateUser, (req, res) => {
  productController.updateProduct(req, res);
});
// Supply product id against which variant is to be added
router.post("/api/variant/", validateUser, (req, res) => {
  variantController.addVariant(req, res);
});
// Supply variant id that is to be updated
router.put("/api/variant/:id", validateUser, (req, res) => {
  variantController.updateVariant(req, res);
});
// Supply variant id that is to be deleted
router.delete("/api/variant/:id", validateUser, (req, res) => {
  variantController.deleteVariant(req, res);
});
router.post("/api/signin", (req, res) => {
  userController.signIn(req, res);
});
router.post("/api/signup", (req, res) => {
  userController.signUp(req, res);
});
router.get("/api/search", (req, res) => {
  searchController.search(req, res);
});

router.use("*", (req, res) => {
  res.status(404).json({ sucess: false, message: "Invalid request." });
});
export default router;
