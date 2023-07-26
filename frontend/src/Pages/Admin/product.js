import React from "react";
import { useEffect } from "react";
import TableLayout from "Components/Form/Layout/TableLayout";
import {
  getProduct,
  deleteProduct,
  paginateProduct,
  searchProduct,
} from "Reducer/statevalue";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT } from "../CONSTANTS";
import { Admin_Page } from "Routes/CONSTANTS";
import { Table, TableLoader } from "Loader/loader";

function Producttable() {
  // const [table,settable]= useState([])
  const dispatch = useDispatch();

  const column = [
    { field: "id", header: "Id" },
    { field: "product_name", header: "Product" },
    { field: "product_image", header: "Image", type: "image" },
    { header: "Action" },
  ];
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const product = useSelector((state) => state.tokenvalue.value.productdata);
  const loading = useSelector((state) => state.tokenvalue.value.loading);

  console.log(product);
  return (
    <div style={{ margin: "20px" }}>
      {!loading ? (
        <TableLayout
          data={product}
          columns={column}
          api={PRODUCT}
          reduxcall={deleteProduct}
          location={Admin_Page}
          paginateapi={paginateProduct}
          datasearch={searchProduct}
        />
      ) : (
        <TableLoader />
      )}
    </div>
  );
}

export default Producttable;
