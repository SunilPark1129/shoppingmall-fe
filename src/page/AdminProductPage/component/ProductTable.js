import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../../../utils/number";
import { useSelector } from "react-redux";
import Loading from "../../../common/component/Loading";
import { resizeImage } from "../../../utils/resizeImage";

const ProductTable = ({
  header,
  data,
  deleteItem,
  openEditForm,
  setOpenSaleForm,
}) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              // 이미지 최적화하기
              const image = resizeImage(item.image[0].url, 200);

              return (
                <tr key={item.sku}>
                  <th>{index}</th>
                  <th>{item.sku}</th>
                  <th style={{ minWidth: "100px" }}>{item.name}</th>
                  <th>{currencyFormat(item.price)}</th>
                  <th>
                    {item.sale !== 0 && (
                      <div className="product-table__sale">{item.sale}%</div>
                    )}
                  </th>
                  <th>
                    {Object.keys(item.stock).map((size, index) => (
                      <div key={index}>
                        {size}:{item.stock[size]}
                      </div>
                    ))}
                  </th>
                  <th>
                    <img src={image} width={100} alt="image" />
                  </th>
                  <th>{item.status}</th>
                  <th
                    style={{
                      minWidth: "100px",
                    }}
                  >
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteItem(item._id)}
                      className="mr-1"
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => openEditForm(item)}
                      className="mr-1"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setOpenSaleForm({ open: true, item })}
                      variant="warning"
                    >
                      Sale
                    </Button>
                  </th>
                </tr>
              );
            })
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
