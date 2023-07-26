import { call, put } from "redux-saga/effects";
import {
  setProduct,
  setCategory,
  setEditproduct,
  setEditcategory,
  setSequencedata,
  setPaginateProduct,
  setPaginateSequence,
  setPaginateCategory,
  setSearchdata,
  setcoupon,
} from "Reducer/statevalue";
import {
  product,
  category,
  editproduct,
  editcategory,
  checkdata,
  sendOTP,
  addproduct,
  addcategory,
  paginatecategory,
  paginatesequence,
  updatecategory,
  updateproduct,
  sendmail,
  deletecategory,
  deleteproduct,
  sequencedata,
  sequenceorder,
  paginateproduct,
  searchdata,
  searchProduct,
  getcoupon,
  updatecoupon,
} from "services/AuthServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function* handleGetProduct(action) {
  try {
    const response = yield call(product);
    const { data } = response;
    console.log(data);
    yield put(setProduct({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetCoupon(action) {
  try {
    const response = yield call(getcoupon);
    const { data } = response;
    console.log("coupondata", data);
    yield put(setcoupon({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handlePaginateProduct(action) {
  try {
    console.log(action.payload);
    const response = yield call(paginateproduct, action.payload);
    const { data } = response;
    console.log(data);
    yield put(setPaginateProduct({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handlePaginateSequence(action) {
  try {
    console.log(action.payload);
    const response = yield call(paginatesequence, action.payload);
    const { data } = response;
    console.log(data);
    yield put(setPaginateSequence({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleSearchData(action) {
  try {
    console.log(action.payload);
    const response = yield call(searchdata, action.payload);
    const { data } = response;
    console.log(data);
    yield put(setPaginateProduct({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCheckOtp(action) {
  try {
    console.log(action.payload.DataObj);
    const response = yield call(checkdata, action.payload.DataObj);
    const { data } = response;
    console.log(data);
    if (data.error) {
      return toast.error(data.error);
    }
    toast.success(data.message);
  } catch (error) {
    console.log(error);
  }
}

export function* handleSendOtp(action) {
  try {
    console.log(action.payload.DataObj);
    const response = yield call(sendOTP, action.payload.DataObj);
    const { data } = response;
    console.log(data);
    if (data.error) {
      toast.error(data.error);
    }
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
}

export function* handleSearchProduct(action) {
  try {
    console.log(action.payload);
    const response = yield call(searchProduct, action.payload);
    const { data } = response;
    console.log(data);
    yield put(setPaginateProduct({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handlePaginateCategory(action) {
  try {
    console.log(action.payload);
    const response = yield call(paginatecategory, action.payload);
    const { data } = response;
    console.log(data);
    yield put(setPaginateCategory({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetCategory(action) {
  try {
    const response = yield call(category);
    const { data } = response;
    console.log(data);
    yield put(setCategory({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleEditProduct(action) {
  try {
    const { id } = action.payload;
    console.log(id);
    const response = yield call(editproduct, id);
    const { data } = response;
    console.log(data);
    yield put(setEditproduct({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleEditCategory(action) {
  try {
    const { id } = action.payload;
    console.log(id);
    const response = yield call(editcategory, id);
    const { data } = response;
    console.log(data);

    yield put(setEditcategory({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleAddProduct(action) {
  try {
    const { DataObj } = action.payload;
    console.log(DataObj);
    const response = yield call(addproduct, DataObj);
    if (response.data.error) {
      response.data.error.map((res) => {
        toast.error(res.msg);
      });
      return;
    }
    return toast.success("success");
  } catch (error) {
    console.log(error);
  }
}

export function* handleAddCategory(action) {
  try {
    const { DataObj } = action.payload;
    console.log(DataObj);
    const response = yield call(addcategory, DataObj);
    if (response.data.error) {
      response.data.error.map((res) => {
        toast.error(res.msg);
      });
      return;
    }
    return toast.success("success");
  } catch (error) {
    console.log(error);
    return error;
  }
}

export function* handleupdateCategory(action) {
  try {
    const { DataObj } = action.payload;
    console.log(DataObj);
    const response = yield call(updatecategory, DataObj);
    const { data } = response;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function* handleupdateProduct(action) {
  try {
    const { DataObj } = action.payload;
    console.log(DataObj);
    const response = yield call(updateproduct, DataObj);
    const { data } = response;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateCoupon(action) {
  try {
    const { DataObj } = action.payload;
    console.log(DataObj);
    const response = yield call(updatecoupon, DataObj);
    const { data } = response;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function* handledeleteCategory(action) {
  try {
    const data = action.payload;
    console.log(data);
    yield call(deletecategory, data);
  } catch (error) {
    console.log(error);
  }
}

export function* handledeleteProduct(action) {
  try {
    const data = action.payload;
    console.log(data);
    yield call(deleteproduct, data);
  } catch (error) {
    console.log(error);
  }
}

export function* handleSendMail(action) {
  try {
    const { DataObj } = action.payload;
    console.log(DataObj);
    yield call(sendmail, DataObj);
  } catch (error) {
    console.log(error);
  }
}

export function* handlesequenceProduct(action) {
  try {
    const response = yield call(sequencedata);
    const { data } = response;
    console.log(data);
    yield put(setSequencedata({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleorderProduct(action) {
  try {
    const { DataObj } = action.payload;
    console.log(DataObj);
    const response = yield call(sequenceorder, DataObj);
    const { data } = response;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
