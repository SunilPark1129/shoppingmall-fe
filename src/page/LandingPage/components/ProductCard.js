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

  const moblieImg = imgURL[0] + `/upload/w_${smWidth}` + imgURL[1];
  const desktopImg = imgURL[0] + `/upload/w_${lgWidth}` + imgURL[1];
  let moblieImg2 = "";
  let desktopImg2 = "";

  // 두번째 이미지가 있다면 두번째도 새로운 이미지 스트링 만들기
  if (item.image[1]) {
    const imgURL2 = item.image[1].url.split("/upload");
    moblieImg2 = imgURL2[0] + `/upload/w_${smWidth}` + imgURL2[1];
    desktopImg2 = imgURL2[0] + `/upload/w_${lgWidth}` + imgURL2[1];
  }

  // 이미지 element의 옵션
  const firstImg = {
    src: moblieImg,
    srcSet: `${moblieImg} ${smWidth}w, ${desktopImg} ${lgWidth}w`,
    sizes: `(max-width: 400px) ${smWidth}px, ${lgWidth}px`,
    alt: "img",
  };

  const secondImg = moblieImg2 && {
    src: moblieImg2,
    srcSet: `${moblieImg2} ${smWidth}w, ${desktopImg2} ${lgWidth}w`,
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
