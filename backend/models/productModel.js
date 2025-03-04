import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true }, // Added code field
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    colour: { type: String, required: true }, // Added colour field
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
    fabric: { type: String, required: true }, // Added fabric field
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
