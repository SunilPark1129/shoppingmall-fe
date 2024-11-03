import React, { useState } from "react";
import { faTrash, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { currencyFormat } from "../../../utils/number";
import { updateQty, deleteCartItem } from "../../../features/cart/cartSlice";
import ConfirmModal from "../../../common/component/ConfirmModal";
import { Link } from "react-router-dom";
import { resizeImage } from "../../../utils/resizeImage";
const CartProductCard = ({ item }) => {
  // 해당 아이템의 디테일 페이지로 이동
  const productDetailLink = `/product/${item.productId._id}`;

  const dispatch = useDispatch();
  const [confirmOption, setConfirmOption] = useState({
    open: false,
    isWarning: false,
    message: "",
    cb: () => {},
  });

  const handleQtyChange = (id, value) => {
    dispatch(updateQty({ id, value }));
  };

  const deleteCart = (id) => {
    setConfirmOption({
      open: true,
      isWarning: true,
      message: "Would you like to remove this item from the cart?",
      cb: () => confirmDelete(id),
    });
  };

  function confirmDelete(id) {
    dispatch(deleteCartItem(id));
  }

  return (
    <>
      <div className="product-card-cart">
        <div className="product-card-cart__img-box">
          <img
            src={resizeImage(item.productId.image[0].url, 200)}
            alt={item.productId.name}
          />
        </div>
        <div className="product-card-cart__content">
          <div className="product-card-cart__header">
            <h3>{item.productId.name}</h3>
            <div className="product-card-cart__header__btns">
              <Link to={productDetailLink} title="go to detail page">
                <FontAwesomeIcon icon={faTshirt} width={24} />
              </Link>
              <button
                className="trash-button"
                onClick={() => deleteCart(item._id)}
                title="delete item"
              >
                <FontAwesomeIcon icon={faTrash} width={24} />
              </button>
            </div>
          </div>

          <div>
            <strong>$ {currencyFormat(item.productId.price)}</strong>
          </div>
          <div>Size: {item.size}</div>
          <div className="product-card-cart__total">
            Total: $ {currencyFormat(item.productId.price * item.qty)}
          </div>
          <div>
            Quantity:
            <Form.Select
              onChange={(event) =>
                handleQtyChange(item._id, event.target.value)
              }
              required
              defaultValue={item.qty}
              className="qty-dropdown"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Form.Select>
          </div>
        </div>
      </div>
      {confirmOption.open && (
        <ConfirmModal
          setConfirmOption={setConfirmOption}
          confirmOption={confirmOption}
        />
      )}
    </>
  );
};

export default CartProductCard;
