import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Shaki',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],

  products: [
    {
      //_id: '1',
      name: 'Ladies Casual Wear',
      code: 'LCW001',
      slug: 'Ladies-Casual-Wear',
      category: 'Ladies Casual Wear',
      image: '/images/Ladies_Casual_Wear.png', // 679px × 829px
      price: 120000,
      countInStock: 100000,
      brand: 'Gobinthan Garments',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality and stylish Stage Background',
      fabric: 'Cotton',
      sizes: [
        {
          size: 'S',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'M',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'L',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
          ],
        },
        {
          size: '1XL',
          colors: [
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '2XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '3XL',
          colors: [{ color: 'Red', quantity: 5000 }],
        },
        {
          size: '4XL',
          colors: [
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
      ],
    },
    {
      // _id: '2',
      name: 'Ladies Home Wear',
      code: 'LHW001',
      slug: 'Ladies-Home-Wear',
      category: 'Ladies Home Wear',
      image: '/images/Ladies_Home_Wear.png', // 679px × 829px
      price: 120000,
      countInStock: 100000,
      brand: 'Gobinthan Garments',
      rating: 4,
      numReviews: 10,
      description: 'high quality and stylish Stage Background',
      fabric: 'Polyester',
      sizes: [
        {
          size: 'S',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'M',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'L',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
          ],
        },
        {
          size: '1XL',
          colors: [
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '2XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '3XL',
          colors: [{ color: 'Red', quantity: 5000 }],
        },
        {
          size: '4XL',
          colors: [
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
      ],
    },
    {
      // _id: '3',
      name: 'Ladies Fashion Wear',
      code: 'LFW001',
      slug: 'Ladies-Fashion-Wear',
      category: 'Ladies Fashion Wear',
      image: '/images/Ladies_Fashion_Wear.png', // 679px × 829px
      price: 120000,
      countInStock: 100000,
      brand: 'Gobinthan Garments',
      rating: 5,
      numReviews: 10,
      description: 'high quality and stylish Stage Background',
      fabric: 'Silk',
      sizes: [
        {
          size: 'S',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'M',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'L',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
          ],
        },
        {
          size: '1XL',
          colors: [
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '2XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '3XL',
          colors: [{ color: 'Red', quantity: 5000 }],
        },
        {
          size: '4XL',
          colors: [
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
      ],
    },
    {
      // _id: '4',
      name: 'Customizable T-Shirts',
      code: 'CTS001',
      slug: 'Customizable-T-Shirts',
      category: 'Customizable T-Shirts',
      image: '/images/Customizable_tshirts.png', // 679px × 829px
      price: 120000,
      countInStock: 100000,
      brand: 'Gobinthan Garments',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality and stylish Stage Background',
      fabric: 'Leather',
      sizes: [
        {
          size: 'S',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'M',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'L',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
          ],
        },
        {
          size: '1XL',
          colors: [
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '2XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '3XL',
          colors: [{ color: 'Red', quantity: 5000 }],
        },
        {
          size: '4XL',
          colors: [
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
      ],
    },
    {
      // _id: '5',
      name: 'School Uniforms',
      code: 'SU001',
      slug: 'School-Uniforms',
      category: 'School Uniforms',
      image: '/images/School_Uniforms.png', // 679px × 829px
      price: 120000,
      countInStock: 100000,
      brand: 'Gobinthan Garments',
      rating: 3,
      numReviews: 10,
      description: 'high quality and stylish Stage Background',
      fabric: 'Linen',
      sizes: [
        {
          size: 'S',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'M',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'L',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
          ],
        },
        {
          size: '1XL',
          colors: [
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '2XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '3XL',
          colors: [{ color: 'Red', quantity: 5000 }],
        },
        {
          size: '4XL',
          colors: [
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
      ],
    },
    {
      //_id: '6',
      name: 'Bed Clothes',
      code: 'BC001',
      slug: 'Bed-Clothes',
      category: 'Bed Clothes',
      image: '/images/Bed_Clothes.png', // 679px × 829px
      price: 120000,
      countInStock: 100000,
      brand: 'Gobinthan Garments',
      rating: 4,
      numReviews: 10,
      description: 'high quality and stylish Stage Background',
      fabric: 'Cotton',
      sizes: [
        {
          size: 'S',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'M',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'L',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: 'XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
          ],
        },
        {
          size: '1XL',
          colors: [
            { color: 'Blue', quantity: 5000 },
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '2XL',
          colors: [
            { color: 'Red', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
        {
          size: '3XL',
          colors: [{ color: 'Red', quantity: 5000 }],
        },
        {
          size: '4XL',
          colors: [
            { color: 'Black', quantity: 5000 },
            { color: 'Green', quantity: 5000 },
          ],
        },
      ],
    },
  ],
};
export default data;
