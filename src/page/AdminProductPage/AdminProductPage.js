import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchBox from "../../common/component/SearchBox";
import NewItemDialog from "./component/NewItemDialog";
import ProductTable from "./component/ProductTable";
import {
  getProductList,
  deleteProduct,
  setSelectedProduct,
  clearError,
} from "../../features/product/productSlice";
import Loading from "../../common/component/Loading";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const queryName = query.get("name");
  const queryPage = query.get("page") || 1;

  const dispatch = useDispatch();
  const { loading, productList, totalPageNum } = useSelector(
    (state) => state.product
  );

  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");

  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "",
  ];

  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(getProductList({ page: queryPage, name: queryName }));
  }, [query]);

  const deleteItem = async (id) => {
    //아이템 삭제하기

    let page = queryPage;

    // 아이템을 지우고 현재 페이지에 더이상 아이템이 존재하지 않으면 페이지 -1 로 이동
    if (totalPageNum > 1 && productList.length === 1) {
      // 아이템을 지움
      await dispatch(deleteProduct({ id }));

      // query 계산
      page = page - 1;
      let query = `page=${page}`;
      if (queryName) query = query + `&name=${queryName}`;

      // query 이동
      navigate("?" + query);
    } else {
      // page를 보내면 해당 페이지로 새로운 product 아이템들을 서버에서 가져옴
      dispatch(deleteProduct({ id, page, name: queryName }));
    }
  };

  const openEditForm = (product) => {
    // Modal을 열기 전에 success를 초기화 해주기
    dispatch(clearError());
    //edit모드로 설정하고
    setMode("edit");
    // 아이템 수정다이얼로그 열어주기
    dispatch(setSelectedProduct(product));
    setShowDialog(true);
  };

  const handleClickNewItem = async () => {
    // Modal을 열기 전에 success를 초기화 해주기
    dispatch(clearError());
    //new 모드로 설정하고
    setMode("new");
    // 다이얼로그 열어주기
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    let query = `page=${selected + 1}`;
    if (queryName) query = query + `&name=${queryName}`;
    navigate("?" + query);
  };

  return (
    <div className="locate-center">
      {loading && <Loading />}
      <Container>
        <div className="mt-2">
          <SearchBox placeholder="제품 이름으로 검색" field="name" />
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
          Add New Item +
        </Button>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={queryPage - 1}
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

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        page={queryPage}
        name={queryName}
      />
    </div>
  );
};

export default AdminProductPage;
