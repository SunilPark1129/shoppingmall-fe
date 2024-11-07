import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../PaymentPage/style/paymentPage.style.css";
import { resetStatusOrder } from "../../features/order/orderSlice";

const OrderCompletePage = () => {
  const dispatch = useDispatch();
  const { orderNum, error } = useSelector((state) => state.order);
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    if (error) {
      const temp = [
        ...error.matchAll(/Insufficient stock for (.*?) in size (.*?)\./g),
      ];

      setErrorList(temp);
    }
  }, [error]);

  useEffect(() => {
    dispatch(resetStatusOrder());
  }, []);
  if (error)
    return (
      <Container className="confirmation-page">
        <h1>Order failed</h1>
        <div className="confirmation-page__content">
          <div>Reason:</div>
          <div>
            {errorList.map((item, idx) => {
              return (
                <div className="confirmation-page__error" key={idx}>
                  Insufficient stock for <span>{item[1]}</span> size in{" "}
                  <span>{item[2]}</span>.
                </div>
              );
            })}
          </div>
        </div>
        <div>Please return to the main page</div>
        <Link to={"/"}>Go back to the main page</Link>
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
