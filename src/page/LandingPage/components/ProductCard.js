import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <div className="card__img">
        {item?.image.length === 1 ? (
          <img src={item?.image[0].url} alt={item?.image} />
        ) : (
          <>
            <img src={item?.image[0].url} alt={item?.image} />
            <img src={item?.image[1].url} alt={item?.image} />
          </>
        )}
      </div>
      <div className="card__info">
        <div>{item?.name}</div>
        <div>$ {currencyFormat(item?.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
