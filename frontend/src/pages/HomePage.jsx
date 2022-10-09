import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productsActions";
import Product from "../components/Product";

const HomePage = () => {
  const productsList = useSelector((state) => state.productList);
  const { products, loading, error } = productsList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {error && <h2>{error}</h2>}
      {loading && <h2>Loading ...</h2>}
      <h1>Featured Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
