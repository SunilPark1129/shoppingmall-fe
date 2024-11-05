import React from "react";
import { Table, Badge } from "react-bootstrap";
import { badgeBg } from "../../../constants/order.constants";
import { currencyFormat } from "../../../utils/number";

const OrderTable = ({ header, data, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.orderNum} onClick={() => openEditForm(item)}>
                <td>{item._id}</td>
                <td>{item.orderNum}</td>
                <td>{item.createdAt.slice(0, 10)}</td>
                <td>{item.userId.email}</td>
                {item.items.length > 0 ? (
                  <td>
                    {item.items[0].productId.name}
                    {item.items.length > 1 &&
                      `${item.items.length - 1} and more`}
                  </td>
                ) : (
                  <td></td>
                )}

                <td>{item.shipTo.address + " " + item.shipTo.city}</td>

                <td>{currencyFormat(item.totalPrice)}</td>
                <td>
                  <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Data to show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default OrderTable;
