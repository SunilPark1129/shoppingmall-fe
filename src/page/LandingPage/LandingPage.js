import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import ReactPaginate from "react-paginate";
import LandingEmpty from "./components/LandingEmpty";
import LandingLoading from "../../common/component/LandingLoading";
import Banner from "./components/Banner";

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
    window.scrollTo(0, 0);
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
      <div className="landing-container">
        <LandingLoading />
      </div>
    );

  return (
    <div>
      {(!page || page === 1) && !name && <Banner />}
      <div className="landing-container">
        <div className="landing-content">
          {productList.length > 0 &&
            productList.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))}
        </div>
        {productList.length === 0 && <LandingEmpty name={name} />}
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={page - 1}
          previousLabel="<"
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
      </div>
    </div>
  );
};

export default LandingPage;
