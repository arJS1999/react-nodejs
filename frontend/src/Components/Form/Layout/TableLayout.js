import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FormControl } from "@mui/material";
import FormLayout from "Components/Form/Layout/FormLayout";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SEQUENCE_FORM_VALIDATION } from "utils/validation/formValidation";
import { updateSequence } from "Reducer/statevalue";
import { SEQUENCE_DATA, CREATE, SET_SEQUENCE } from "Pages/CONSTANTS";
import { TextInputField, SubmitButton } from "Components/Form";
import { getSequence } from "Reducer/statevalue";
import TablePagination from "@mui/material/TablePagination";
import { TableLoader } from "Loader/loader";

const TableLayout = ({
  data,
  columns,
  api,
  reduxcall,
  location,
  paginateapi,
  datasearch,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const product = useSelector((state) => state.tokenvalue.value.paginatedata);
  const total = useSelector((state) => state.tokenvalue.value.pagecount);
  const [searchdata, setsearch] = useState("");

  const limit = rowsPerPage;

  useEffect(() => {
    const paginate = { limit, page };
    dispatch(paginateapi({ paginate }));
  }, [page, limit]);

  console.log("backend", data, total);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isaction = (header, row) => {
    // eslint-disable-next-line eqeqeq
    if (header == "Action") {
      return (
        <React.Fragment>
          <Link to={api + "/" + row["id"]}>
            <button className="btn btn-primary m-2">Edit</button>
          </Link>
          <button
            className="btn btn-primary m-2"
            type="submit"
            onClick={(event) => {
              deleteItem(row["id"]);
            }}
          >
            Delete
          </button>
        </React.Fragment>
      );
      // eslint-disable-next-line eqeqeq
    } else if (header == "Sequence") {
      return (
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(event) => {
            handleOpen(row["id"]);
          }}
        >
          Create
        </button>
      );
    }
    return null;
  };
  function handleOpen(id) {
    console.log(id);
    setOpen(true);
    setId(id);
  }
  function handleClick() {
    setOpen(false);

    dispatch(getSequence());
    data = product;
  }
  function valid() {
    return {
      id: id,
      product_order: 0,
    };
  }
  function deleteItem(data) {
    console.log(data);
    dispatch(reduxcall({ data }));
    return navigate(location);
  }

  const getcol = (head) => {
    return head.toUpperCase();
  };
  const Searchdata = (value) => {
    console.log(value);
    dispatch(datasearch(value));
  };
  return (
    <React.Fragment>
      <div className="d-flex justify align-items-center container ">
        <input
          type="text"
          className="w-25 p-3 h-25"
          placeholder="search"
          onChange={(event) => {
            Searchdata(event.target.value);
          }}
        />
      </div>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <th>{getcol(column.header)}</th>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                // .filter((e) => {
                //   if (searchdata == "") {
                //     return e;
                //   } else if (
                //     e.product_name
                //       .toLowerCase()
                //       .includes(searchdata.toLowerCase())
                //   ) {
                //     return e;
                //   }
                // })
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((row) => (
                  <TableRow>
                    {columns.map((column) => (
                      <React.Fragment>
                        <TableCell>
                          {column.type == "image" ? (
                            <img
                              src={"/Images/" + row[column.field]}
                              alt="img"
                              height="50px"
                              width="100px"
                            />
                          ) : (
                            row[column.field]
                          )}
                          {column.field == null
                            ? isaction(column.header, row)
                            : null}
                        </TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data ? (
        <TablePagination
          rowsPerPageOptions={[3, 6, 12]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <TableLoader />
      )}
      <Dialog open={open} onClose={handleClick}>
        <FormLayout
          INITITAL_FORM_STATE={valid()}
          FORM_VALIDATION={SEQUENCE_FORM_VALIDATION}
          apicall={updateSequence}
          action={SET_SEQUENCE}
        >
          <FormControl margin="normal">
            <div className="h2">{SET_SEQUENCE}</div>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <TextInputField
              name="product_order"
              margin="normal"
              label="Sequence"
              type="number"
            />
          </FormControl>

          <FormControl fullWidth={true} margin="normal">
            <SubmitButton>{CREATE}</SubmitButton>
          </FormControl>
        </FormLayout>
      </Dialog>
    </React.Fragment>
  );
};

export default TableLayout;
