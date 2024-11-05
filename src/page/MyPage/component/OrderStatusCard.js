import React, { useState } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";
import { resizeImage } from "../../../utils/resizeImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const OrderStatusCard = ({ orderItem }) => {
  const [hasOpen, setHasOpen] = useState(false);
  const image = resizeImage(orderItem.items[0]?.productId?.image[0].url, 100);
  console.log(orderItem);
  function handleOpen() {
    setHasOpen((prev) => !prev);
  }
  return (
    <div>
      <Row className="status-card gap-2">
        <div className="status-card__item status-card__item--top">
          <div className="status-card__img-box">
            <img src={image} alt={"cloth"} height={96} />
          </div>
          <div className="status-card__content">
            <div>
              <div>
                <strong>주문번호: {orderItem.orderNum}</strong>
              </div>
              <div className="text-14">{orderItem.createdAt.slice(0, 10)}</div>
              <div>
                {orderItem.shipTo.address} {orderItem.shipTo.city}{" "}
                {orderItem.shipTo.zip}
              </div>

              <div>
                {orderItem.items[0].productId.name}
                {orderItem.items.length > 1 &&
                  `외 ${orderItem.items.length - 1}개`}
              </div>
              <div>$ {currencyFormat(orderItem.totalPrice)}</div>
            </div>
            <div md={2} className="vertical-middle status-card__status">
              <div className="text-align-center text-12">주문상태</div>
              <Badge bg={badgeBg[orderItem.status]}>{orderItem.status}</Badge>
            </div>
          </div>
        </div>
        {hasOpen && (
          <>
            <div className="status-card__detail">
              <div className="line"></div>
              {orderItem.items.map(({ price, productId, qty, size }, idx) => {
                const { image, name } = productId;
                return (
                  <div className="status-card__gap" key={idx}>
                    <div className="status-card__item">
                      <div className="status-card__img-box">
                        <img src={resizeImage(image[0].url, 100)} alt={name} />
                      </div>
                      <div className="status-card__desc">
                        <div>{name}</div>
                        <div>Size: {size}</div>
                        <div>Qty: {qty}</div>
                        <div>Price: ${price}</div>
                        <div>Total: ${currencyFormat(price * qty)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <button className="status-card__btn" onClick={handleOpen}>
          {hasOpen ? (
            <>
              닫기 <FontAwesomeIcon className="search-icon" icon={faAngleUp} />
            </>
          ) : (
            <>
              자세히보기{" "}
              <FontAwesomeIcon className="search-icon" icon={faAngleDown} />
            </>
          )}
        </button>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
