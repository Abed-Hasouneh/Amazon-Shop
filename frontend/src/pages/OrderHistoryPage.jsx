import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";

const OrderHistoryPage = () => {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className="py-4">
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order?._id}>
                <td>{order?._id}</td>
                <td>{order?.createdAt.substring(0, 10)}</td>
                <td>{order?.totalPrice.toFixed(2)}</td>
                <td>{order?.isPaid ? order?.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order?.isDelivered
                    ? order?.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order?._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
