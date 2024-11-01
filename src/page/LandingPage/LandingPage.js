import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import Loading from "../../common/component/Loading";
import ReactPaginate from "react-paginate";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, productList, totalPageNum } = useSelector(
    (state) => state.product
  );
  const [query] = useSearchParams();
  const name = query.get("name");
  const page = query.get("page") || 1;

  useEffect(() => {
    dispatch(getProductList({ page: page, name: name }));
  }, [query]);

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    let query = `page=${selected + 1}`;
    if (name) query = query + `&name=${name}`;
    navigate("?" + query);
  };

  if (loading)
    return (
      <div
        className="position-relative m-auto"
        style={{ maxWidth: "1320px", height: "20rem" }}
      >
        <Loading />
      </div>
    );

  return (
    <Container>
      <Row className="pt-lg-5 pb-lg-5">
        {productList.length > 0 ? (
          productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h2>{name}과 일치한 상품이 없습니다!`</h2>
            )}
          </div>
        )}
      </Row>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={page - 1}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="display-center list-style-none"
      />
    </Container>
  );
};

export default LandingPage;
