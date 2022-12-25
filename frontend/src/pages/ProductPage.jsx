import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productsActions";
import { Helmet } from "react-helmet-async";
import { addToCart } from "../actions/cartActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem
      ? Number(existItem.quantity) + Number(qty)
      : Number(qty);
    if (product.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  return (
    <div className="py-4">
      {error && <MessageBox>{error}</MessageBox>}

      {loading ? (
        <LoadingBox />
      ) : (
        <Row>
          <Col md={6}>
            <img className="img-large" src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                    <Row className="d-flex align-items-center my-2">
                      <Col>QTY:</Col>
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

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductPage;
