import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? Number(existItem.quantity) + 1 : 1;
    if (product.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch(addToCart(product._id, quantity));
    navigate("/cart");
  };
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
