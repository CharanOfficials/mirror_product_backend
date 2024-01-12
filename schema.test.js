import mongoose from "mongoose";
import Products from "./src/model/product.schema";

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product model", () => {
  it("should save a product", async () => {
    const productData = {
      name: "Test Product",
      description: "Test description",
      price: 19.99,
      variants: [], // Add any variants if needed
    };

    const product = new Products(productData);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(productData.name);
    expect(savedProduct.description).toBe(productData.description);
    expect(savedProduct.price).toBe(productData.price);
    // Add more expectations as needed
  });

  it("should retrieve a product", async () => {
    const productData = {
      name: "Test Product",
      description: "Test description",
      price: 19.99,
      variants: [],
    };

    const product = new Products(productData);
    await product.save();

    const retrievedProduct = await Products.findOne({ name: "Test Product" });

    expect(retrievedProduct).toBeDefined();
    expect(retrievedProduct.name).toBe(productData.name);
    expect(retrievedProduct.description).toBe(productData.description);
    expect(retrievedProduct.price).toBe(productData.price);
  });
});
