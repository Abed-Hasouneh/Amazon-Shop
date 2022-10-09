import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productsActions";
import { Helmet } from "react-helmet-async";

const ProductPage = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const returnHandler = () => {
    navigate("/");
  };

  return (
    <div>
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading ...</h2>}
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
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
