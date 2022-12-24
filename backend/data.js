import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Abed Hassouneh",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim shirt",
      // _id: "1",
      category: "Shirts",
      image: "/images/p1.jpg", // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      name: "Adidas Fit Shirt",
      // _id: "2",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 250,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      name: "Nike Slim Pant",
      // _id: "3",
      category: "Pants",
      image: "/images/p3.jpg",
      price: 25,
      countInStock: 50,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      name: "Adidas Fit Pant",
      // _id: "4",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
  ],
};
export default data;
