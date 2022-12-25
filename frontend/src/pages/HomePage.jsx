import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productsActions";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const HomePage = () => {
  const productsList = useSelector((state) => state.productList);
  const { products, loading, error } = productsList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {error && <MessageBox>{error}</MessageBox>}

      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <h1 className="py-4">Featured Products</h1>
      {loading ? (
        <LoadingBox />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
