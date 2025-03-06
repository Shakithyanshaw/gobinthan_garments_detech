import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get(`/`, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

const PAGE_SIZE = 3;
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

productRouter.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

export default productRouter;
