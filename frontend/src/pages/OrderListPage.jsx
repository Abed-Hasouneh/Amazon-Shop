import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import { getError } from "../utilites";

const OrderListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrders(data);
        data && setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(getError(err));
      }
    };
    fetchData();
  }, [userInfo, successDelete, dispatch]);

  const deleteHandler = async (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <h1>Orders</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>{order?.user ? order?.user?.name : "DELETED USER"}</td>
                  <td>{order?.createdAt.substring(0, 10)}</td>
                  <td>{order?.totalPrice.toFixed(2)}</td>
                  <td>
                    {order?.isPaid ? order?.paidAt.substring(0, 10) : "No"}
                  </td>
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
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListPage;
