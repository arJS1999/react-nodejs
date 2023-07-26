import React from "react";
import { useEffect } from "react";
import TableLayout from "Components/Form/Layout/TableLayout";
import {
  getSequence,
  paginateSequence,
  searchProduct,
} from "Reducer/statevalue";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT } from "../CONSTANTS";
import { Table, TableLoader } from "Loader/loader";

function Sequencetable() {
  // const [table,settable]= useState([])
  const dispatch = useDispatch();

  const column = [
    { field: "id", header: "Id" },
    { field: "product_name", header: "Product" },
    { field: "product_order", header: "Product Order" },
    { field: null, header: "Sequence" },
  ];
  useEffect(() => {
    dispatch(getSequence());
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
          datasearch={searchProduct}
          api={PRODUCT}
          paginateapi={paginateSequence}
        />
      ) : (
        <TableLoader />
      )}
    </div>
  );
}

export default Sequencetable;
