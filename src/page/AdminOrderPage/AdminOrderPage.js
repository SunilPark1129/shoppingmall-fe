import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import OrderDetailDialog from "./component/OrderDetailDialog";
import OrderTable from "./component/OrderTable";
import SearchBox from "../../common/component/SearchBox";
import {
  getOrderList,
  setSelectedOrder,
} from "../../features/order/orderSlice";
import "./style/adminOrder.style.css";
import Loading from "../../common/component/Loading";

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const page = query.get("page") || 1;
  const orderNum = query.get("name") || "";
  const dispatch = useDispatch();
  const { orderList, totalPageNum, loading } = useSelector(
    (state) => state.order
  );
  const [open, setOpen] = useState(false);

  const tableHeader = [
    "#",
    "Order#",
    "Order Date",
    "User",
    "Order Item",
    "Address",
    "Total Price",
    "Status",
  ];

  useEffect(() => {
    const queries = { page, orderNum };
    dispatch(getOrderList({ ...queries }));
  }, [query]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch(setSelectedOrder(order));
  };

  const handlePageClick = ({ selected }) => {
    navigate(`?page=${selected + 1}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="locate-center">
      {loading && <Loading clickable={true} />}
      <Container>
        <div className="mt-2 display-center mb-2">
          <SearchBox placeholder="오더번호" field="ordernum" />
        </div>

        <OrderTable
          header={tableHeader}
          data={orderList}
          openEditForm={openEditForm}
        />

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

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AdminOrderPage;
