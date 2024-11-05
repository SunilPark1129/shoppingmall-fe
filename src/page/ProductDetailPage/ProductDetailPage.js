import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { currencyFormat } from "../../utils/number";
import "./style/productDetail.style.css";
import { getProductDetail } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import Loading from "../../common/component/Loading";
import { resizeImage } from "../../utils/resizeImage";

const sizes = ["xs", "s", "m", "l", "xl"];

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.product);
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImg, setSelectedImg] = useState(0);
  const [imgList, setImgList] = useState([]);
  const [imgHide, setImgHide] = useState(false);

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    if (!size) {
      setSizeError(true);
      return;
    }
    // 아직 로그인을 안한유저라면 로그인페이지로
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    // 카트에 아이템 추가하기
    dispatch(addToCart({ id, size }));
  };
  const selectSize = (value) => {
    if (value) setSizeError(false);
    // 사이즈 추가하기
    setSize(value);
  };

  useEffect(() => {
    if (selectedProduct) {
      const temp = selectedProduct.image.filter(
        (_, idx) => idx !== selectedImg
      );
      setImgList(temp);
    }
  }, [selectedImg, selectedProduct]);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]);

  function imgClickHandler(targetId) {
    const findIndex = selectedProduct.image.findIndex(
      ({ id }) => id === targetId
    );
    setSelectedImg(findIndex);
  }

  if (loading || !selectedProduct)
    return (
      <div
        className="position-relative m-auto"
        style={{ maxWidth: "1320px", height: "100vh" }}
      >
        <Loading />
      </div>
    );
  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <div className="product-detail-card__img-box">
            <img
              src={resizeImage(selectedProduct.image[selectedImg].url, 600)}
              className="w-100"
              alt="image"
            />
            {selectedProduct.image.length > 1 && (
              <div className="product-detail-card__img-lists">
                <>
                  <button
                    className="product-detail-card__arrow"
                    onClick={() => setImgHide((prev) => !prev)}
                  >
                    {imgHide ? "SHOW" : "HIDE"}
                  </button>
                  {!imgHide &&
                    imgList.map(({ url, id }) => (
                      <img
                        src={resizeImage(url, 600)}
                        key={id}
                        alt="image"
                        onClick={() => imgClickHandler(id)}
                      />
                    ))}
                </>
              </div>
            )}
          </div>
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product__content">
            <div className="product-info">
              <h1>{selectedProduct.name}</h1>
              <div>
                $<span>{currencyFormat(selectedProduct.price)}</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="product-info">
              <p>{selectedProduct.description}</p>
            </div>
            <div className="product__size">
              {sizeError ? (
                <div className="product__size__text product__size__text--warning">
                  {sizeError && "Please select a size"}
                </div>
              ) : (
                <div className="product__size__text">
                  {size ? "Selected Size" : "Select Size"}{" "}
                  <span>{size.toUpperCase()}</span>
                </div>
              )}
              <div className="product__size__box">
                {sizes.map((item) => {
                  const stockQty = selectedProduct.stock[item];
                  const hasSelected = item === size;

                  return (
                    <button
                      disabled={!stockQty}
                      className={`product__size__item ${
                        hasSelected && "active"
                      }`}
                      onClick={() => selectSize(item)}
                      key={item}
                    >
                      <div>{item.toUpperCase()}</div>
                      <div>{stockQty ?? 0}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              variant="dark"
              className="add-button"
              onClick={addItemToCart}
            >
              Add to cart
            </Button>
            <div>
              SHIPPING POLICY: Shipping is available to customers at least 13
              years of age with a valid US shipping and billing address. H&M
              HOME furniture, shelving, lighting and area rugs can only be
              shipped via standard shipping. Orders placed using any other
              method will be cancelled and a refund will be issued. PAYMENT: We
              accept card payments via Visa, Apple Pay, MasterCard, Discover and
              American Express. Learn more on our customer service pages.
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
