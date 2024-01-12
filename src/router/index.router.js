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

/**
 * @swagger
 * paths:
 *   /api/products:
 *     get:
 *       summary: Get Products
 *       description: Retrieve a list of products (Protected Route)
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Data fetched successfully.
 *                 data: [product1, product2, ...]
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

router.get("/api/products", validateUser, (req, res) => {
  productController.getProducts(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/products/{id}:
 *     get:
 *       summary: Get a Product by ID (Protected Route)
 *       description: Retrieve a product by its ID (Protected Route)
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the product to retrieve
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Product fetched successfully.
 *                 data: product
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid product ID.
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: No product found with the given ID.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

router.get("/api/product/:id", validateUser, (req, res) => {
  productController.getProduct(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/products:
 *     post:
 *       summary: Add a Product (Protected Route)
 *       description: Add a new product with the given name, description, and price (Protected Route)
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '201':
 *           description: Product added successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Product added successfully.
 *                 data: product
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid data provided in the request.
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

router.post("/api/products", validateUser, (req, res) => {
  productController.addProduct(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/products/{id}:
 *     delete:
 *       summary: Delete a Product by ID (Protected Route)
 *       description: Delete a product by its ID (Protected Route)
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the product to delete
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Product deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Product deleted successfully.
 *                 data: deletedProduct
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid product ID or variants exist.
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: No product found with the given ID.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

router.delete("/api/product/:id", validateUser, (req, res) => {
  productController.deleteProduct(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/products/{id}:
 *     put:
 *       summary: Update a Product by ID (Protected Route)
 *       description: Update a product by its ID (Protected Route)
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the product to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Product updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Product updated successfully.
 *                 data: updatedProduct
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid product ID or data provided in the request.
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: No product found with the given ID.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

router.put("/api/product/:id", validateUser, (req, res) => {
  productController.updateProduct(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/variants:
 *     post:
 *       summary: Add a Variant (Protected Route)
 *       description: Add a new variant with the given name, SKU id, additional cost, and count (Protected Route)
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 sku_id:
 *                   type: string
 *                 additional_cost:
 *                   type: number
 *                 count:
 *                   type: integer
 *                 productId:
 *                   type: string
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '201':
 *           description: Variant added successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Variant added successfully.
 *                 data: variant
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid data provided in the request or SKU id already exists.
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Product not found.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

// Supply product id against which variant is to be added
router.post("/api/variant/", validateUser, (req, res) => {
  variantController.addVariant(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/variants/{id}:
 *     put:
 *       summary: Update a Variant by ID (Protected Route)
 *       description: Update a variant by its ID (Protected Route)
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the variant to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 additional_cost:
 *                   type: number
 *                 count:
 *                   type: integer
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Variant updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Variant updated successfully.
 *                 data: updatedVariant
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid variant ID or data provided in the request.
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: No variant found with the given ID.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

// Supply variant id that is to be updated
router.put("/api/variant/:id", validateUser, (req, res) => {
  variantController.updateVariant(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/variants/{id}:
 *     delete:
 *       summary: Delete a Variant by ID (Protected Route)
 *       description: Delete a variant by its ID (Protected Route)
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the variant to delete
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Variant deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Variant deleted successfully.
 *                 data: deletedVariant
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid variant ID.
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: No variant found with the given ID.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

// Supply variant id that is to be deleted
router.delete("/api/variant/:id", validateUser, (req, res) => {
  variantController.deleteVariant(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/search:
 *     get:
 *       summary: Search for Products (Protected Route)
 *       description: Search for products based on the provided query (Protected Route)
 *       parameters:
 *         - in: query
 *           name: query
 *           required: true
 *           schema:
 *             type: string
 *           description: The search query
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Products found successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Products found successfully.
 *                 data: products
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Search query is required.
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Unauthorized access.
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: No products found matching the search query.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */

router.get("/api/search", validateUser, (req, res) => {
  searchController.search(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/users/signup:
 *     post:
 *       summary: User Sign Up
 *       description: Create a new user account with a given email and password
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: User created successfully
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid user.
 *         '409':
 *           description: Conflict
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: User already exists.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */
router.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
/**
 * @swagger
 * paths:
 *   /api/users/signin:
 *     post:
 *       summary: User Sign In
 *       description: Authenticate user with email and password and return an access token
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 message: Logged in successfully
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGZlNzRiMDIwMjY4OTI5NDA2ZDAyNTUiLCJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwiaWF0IjoxNjM2MzA4MzI5LCJleHAiOjE2MzYzMTk1Mjl9.L2SOUJ1zJ1gUSX-8jZi-VsZtrTJ91ZVe29WVCZT1wX4"
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Invalid user or password.
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error.
 */
router.post("/signin", (req, res) => {
  userController.signIn(req, res);
});

router.use("*", (req, res) => {
  res.status(404).json({ sucess: false, message: "Invalid request." });
});
export default router;
