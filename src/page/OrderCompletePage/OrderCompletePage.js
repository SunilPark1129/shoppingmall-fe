import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../PaymentPage/style/paymentPage.style.css";
import { resetStatusOrder } from "../../features/order/orderSlice";

const OrderCompletePage = () => {
  const dispatch = useDispatch();
  const { orderNum } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(resetStatusOrder());
  }, []);
  if (orderNum === "")
    return (
      <Container className="confirmation-page">
        <h1>Order failed</h1>
        <div>
          Please return to the main page
          <Link to={"/"}>Go back to the main page</Link>
        </div>
      </Container>
    );
  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>Your order has been completed!</h2>
      <div>Order number: {orderNum}</div>
      <div>
        Please check your order confirmation in the My Orders section
        <div className="text-align-center">
          <Link to={"/account/purchase"}>Go to My Orders</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
