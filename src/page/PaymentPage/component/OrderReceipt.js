import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const OrderReceipt = ({ cartList, totalPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">Order history</h3>
      <ul className="receipt-list">
        {cartList.length > 0 ? (
          cartList.map((item) => {
            const { name, price } = item.productId;
            const { qty, _id } = item;
            return (
              <li key={_id}>
                <div className="display-flex space-between">
                  <div>{name}</div>

                  <div>$ {currencyFormat(price * qty)}</div>
                </div>
              </li>
            );
          })
        ) : (
          <li>
            <div className="display-flex space-between">
              <div>There are no items added to your list</div>

              <div>$ 0</div>
            </div>
          </li>
        )}
      </ul>
      <div className="display-flex space-between receipt-title">
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>$ {totalPrice}</strong>
        </div>
      </div>
      {location.pathname.includes("/cart") && cartList.length > 0 && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          Continue to payment
        </Button>
      )}

      <div>
        Payment methods available: The prices and shipping fees will not be
        confirmed until you reach the payment stage.
        <div>
          You can return items within 30 days, and please read about the return
          fee and additional shipping charges for items not received regarding
          returns and refunds.
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
