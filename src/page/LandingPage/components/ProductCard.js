import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const smWidth = "400";
const lgWidth = "600";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // 이미지 최적화하기
  const imgURL = item.image[0].url.split("/upload");

  const smImg = imgURL[0] + `/upload/w_${smWidth}` + imgURL[1];
  const bgImg = imgURL[0] + `/upload/w_${lgWidth}` + imgURL[1];
  let smImg2 = "";
  let bgImg2 = "";

  if (item.image[1]) {
    const imgURL2 = item.image[1].url.split("/upload");
    smImg2 = imgURL2[0] + `/upload/w_${smWidth}` + imgURL2[1];
    bgImg2 = imgURL2[0] + `/upload/w_${lgWidth}` + imgURL2[1];
  }

  const firstImg = {
    src: smImg,
    srcSet: `${smImg} ${smWidth}w, ${bgImg} ${lgWidth}w`,
    sizes: `(max-width: 400px) ${smWidth}px, ${lgWidth}px`,
    alt: "img",
  };

  const secondImg = smImg2 && {
    src: smImg2,
    srcSet: `${smImg2} ${smWidth}w, ${bgImg2} ${lgWidth}w`,
    sizes: `(max-width: 400px) ${smWidth}px, ${lgWidth}px`,
    alt: "img",
  };

  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <div className="card__img">
        {item?.image.length === 1 ? (
          <img {...firstImg} />
        ) : (
          <>
            <img {...firstImg} />
            <img {...secondImg} />
          </>
        )}
      </div>
      <div className="card__info">
        <div className="card__info__name">{item?.name}</div>
        <div>
          $ <span>{currencyFormat(item?.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
