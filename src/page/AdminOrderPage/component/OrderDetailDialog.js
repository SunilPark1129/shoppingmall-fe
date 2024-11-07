import React, { useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";
import { updateOrder } from "../../../features/order/orderSlice";
import { useSearchParams } from "react-router-dom";

const OrderDetailDialog = ({ open, handleClose }) => {
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
  const dispatch = useDispatch();

  const [query] = useSearchParams();
  const page = query.get("page") || 1;
  const orderNum = query.get("name") || "";

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const submitStatus = (e) => {
    e.preventDefault();
    dispatch(
      updateOrder({
        id: selectedOrder._id,
        status: orderStatus,
        page,
        orderNum,
      })
    );
    handleClose();
  };

  if (!selectedOrder) {
    return <></>;
  }
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Order number: {selectedOrder.orderNum}</p>
        <p>Order date: {selectedOrder.createdAt.slice(0, 10)}</p>
        <p>Email: {selectedOrder.userId.email}</p>
        <p>
          Address:
          {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
        </p>
        <p>
          Mobile:
          {`${
            selectedOrder.contact.firstName + selectedOrder.contact.lastName
          } ${selectedOrder.contact.contact}`}
        </p>
        <p>Order history</p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Sale</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>{currencyFormat(item.price)}</td>
                    <td>{item.sale}%</td>
                    <td>{item.qty}</td>
                    <td>
                      {currencyFormat(
                        item.price * (1 - item.sale / 100) * item.qty
                      )}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={5}>Total:</td>
                <td>{currencyFormat(selectedOrder.totalPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="order-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="order-button"
            >
              Close
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
