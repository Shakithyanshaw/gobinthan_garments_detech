import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get(`/`, async (req, res) => {
  // Product.remove({}) is deprecated in modern versions of Mongoose.
  // Instead, use deleteMany({}) to clear all products.
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});
export default seedRouter;
