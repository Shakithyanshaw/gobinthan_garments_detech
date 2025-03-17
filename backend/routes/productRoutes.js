import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();
const PAGE_SIZE = 10;

productRouter.get(`/`, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const size = query.size || '';
    const color = query.color || '';
    const fabric = query.fabric || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: { $regex: searchQuery, $options: 'i' },
          }
        : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all' ? { rating: { $gte: Number(rating) } } : {};
    const fabricFilter = fabric && fabric !== 'all' ? { fabric } : {};

    // Updated size filter with quantity check
    const sizeFilter =
      size && size !== 'all'
        ? {
            sizes: {
              $elemMatch: {
                size: size,
                'colors.quantity': { $gt: 0 },
              },
            },
          }
        : {};

    // Updated color filter with quantity check
    const colorFilter =
      color && color !== 'all'
        ? {
            sizes: {
              $elemMatch: {
                colors: {
                  $elemMatch: {
                    color: color,
                    quantity: { $gt: 0 },
                  },
                },
              },
            },
          }
        : {};

    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
      ...fabricFilter,
      ...sizeFilter,
      ...colorFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
      ...fabricFilter,
      ...sizeFilter,
      ...colorFilter,
    });

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

// Get available sizes with stock
productRouter.get(
  '/sizes',
  expressAsyncHandler(async (req, res) => {
    const sizes = await Product.aggregate([
      { $unwind: '$sizes' },
      { $unwind: '$sizes.colors' },
      { $match: { 'sizes.colors.quantity': { $gt: 0 } } },
      { $group: { _id: '$sizes.size' } },
      { $project: { _id: 0, size: '$_id' } },
      { $sort: { size: 1 } },
    ]);
    res.send(sizes.map((s) => s.size));
  })
);

// Get available colors with stock
productRouter.get(
  '/colors',
  expressAsyncHandler(async (req, res) => {
    const colors = await Product.aggregate([
      { $unwind: '$sizes' },
      { $unwind: '$sizes.colors' },
      { $match: { 'sizes.colors.quantity': { $gt: 0 } } },
      { $group: { _id: '$sizes.colors.color' } },
      { $project: { _id: 0, color: '$_id' } },
      { $sort: { color: 1 } },
    ]);
    res.send(colors.map((c) => c.color));
  })
);

// Get all available fabrics
productRouter.get(
  '/fabrics',
  expressAsyncHandler(async (req, res) => {
    const fabrics = await Product.distinct('fabric');
    res.send(fabrics);
  })
);

productRouter.get(`/slug/:slug`, async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

// Admin Product List Route
productRouter.get(
  '/admin',
  expressAsyncHandler(async (req, res) => {
    const { page = 1 } = req.query;

    const products = await Product.find({})
      .select('name code category fabric sizes createdAt updatedAt')

      .skip(PAGE_SIZE * (page - 1))
      .limit(PAGE_SIZE)
      .sort({ createdAt: -1 });

    const countProducts = await Product.countDocuments({});

    res.send({
      products,
      countProducts,
      page: Number(page),
      pages: Math.ceil(countProducts / PAGE_SIZE),
    });
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      await product.deleteOne(); // Use deleteOne method instead of remove
      res.status(200).send({ success: true, message: 'Product Deleted' });
    } else {
      res.status(404).send({ success: false, message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'New Product',
      code: `CODE-${Date.now()}`,
      slug: `new-product-${Date.now()}`,
      image: '/images/placeholder.jpg',
      price: 0,
      category: 'Sample Category',
      brand: 'Sample Brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'Sample Description',
      fabric: 'Sample Fabric',
      sizes: [],
    });

    const createdProduct = await product.save();
    res
      .status(201)
      .send({ message: 'Product Created', product: createdProduct });
  })
);

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product' });
  }
});

productRouter.put('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.code = req.body.code || product.code;
      product.slug = req.body.slug || product.slug;
      product.category = req.body.category || product.category;
      product.image = req.body.image;
      product.images = req.body.images;
      product.price = req.body.price || product.price;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.brand = req.body.brand || product.brand;
      product.rating = req.body.rating || product.rating;
      product.numReviews = req.body.numReviews || product.numReviews;
      product.description = req.body.description || product.description;
      product.fabric = req.body.fabric || product.fabric;
      product.sizes = req.body.sizes || product.sizes; // Array of sizes with colors and quantity

      const updatedProduct = await product.save();
      res.json({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

productRouter.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

export default productRouter;
