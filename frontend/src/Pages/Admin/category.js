import React from "react";
import { useEffect } from "react";
import TableLayout from "Components/Form/Layout/TableLayout";
import {
  getCategory,
  deleteCategory,
  paginateCategory,
  searchCategory,
} from "Reducer/statevalue";
import { Admin_Page2 } from "Routes/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY } from "../CONSTANTS";
import { Table, TableLoader } from "Loader/loader";

function Category() {
  const dispatch = useDispatch();
  const column = [
    { field: "id", header: "Id" },
    { field: "category_name", header: "Category" },
    { header: "Action" },
  ];

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const category = useSelector((state) => state.tokenvalue.value.productdata);
  const loading = useSelector((state) => state.tokenvalue.value.loading);

  console.log(category);

  return (
    <div style={{ margin: "20px" }}>
      {!loading ? (
        <TableLayout
          data={category}
          columns={column}
          api={CATEGORY}
          reduxcall={deleteCategory}
          location={Admin_Page2}
          paginateapi={paginateCategory}
          datasearch={searchCategory}
        />
      ) : (
        <TableLoader />
      )}
    </div>
  );
}

export default Category;
