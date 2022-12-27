import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Badge from "react-bootstrap/esm/Badge";

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem
      ? Number(existItem.quantity) + Number(qty)
      : Number(qty);
    if (product.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch(addToCart(product._id, quantity));
    toast.success("Product Added to Cart");
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
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col className="pb-2">
                <span className="pe-2">Status:</span>
                {product.countInStock > 0 ? (
                  <Badge bg="success">In Stock</Badge>
                ) : (
                  <Badge bg="danger">Unavailable</Badge>
                )}
              </Col>
            </Row>
            <Row className="d-flex align-items-center my-2">
              <Col className="pr-3">
                {product.countInStock === 0 ? (
                  <Button variant="light" disabled>
                    Out of stock
                  </Button>
                ) : (
                  <Button onClick={() => addToCartHandler(product)}>
                    Add to cart
                  </Button>
                )}
              </Col>
              <Col>
                <Form.Select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Product;
