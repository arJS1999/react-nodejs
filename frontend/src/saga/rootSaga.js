import { takeLatest } from "redux-saga/effects";
import {
  handleGetProduct,
  handleGetCategory,
  handleEditProduct,
  handleEditCategory,
  handleAddProduct,
  handleSendOtp,
  handleAddCategory,
  handleSearchProduct,
  handleupdateCategory,
  handleupdateProduct,
  handledeleteCategory,
  handledeleteProduct,
  handlesequenceProduct,
  handleSearchData,
  handleSendMail,
  handlePaginateProduct,
  handleorderProduct,
  handlePaginateCategory,
  handleGetCoupon,
  handleCheckOtp,
  handleUpdateCoupon,
  handlePaginateSequence,
} from "saga/handler";
import {
  getProduct,
  getCategory,
  editproduct,
  searchProduct,
  editcategory,
  checkOtp,
  addProduct,
  paginateProduct,
  getCoupon,
  addCategory,
  paginateSequence,
  updateCategory,
  updateProduct,
  deleteCategory,
  deleteProduct,
  getSequence,
  updateSequence,
  paginateCategory,
  sendOtp,
  sendMail,
  searchCategory,
  updateCoupon,
  // paginateSequence,
} from "Reducer/statevalue";

export function* watcherSaga() {
  yield takeLatest(getProduct.type, handleGetProduct);
  yield takeLatest(getCategory.type, handleGetCategory);
  yield takeLatest(editproduct.type, handleEditProduct);
  yield takeLatest(editcategory.type, handleEditCategory);
  yield takeLatest(addProduct.type, handleAddProduct);
  yield takeLatest(addCategory.type, handleAddCategory);
  yield takeLatest(updateCategory.type, handleupdateCategory);
  yield takeLatest(updateProduct.type, handleupdateProduct);
  yield takeLatest(deleteProduct.type, handledeleteProduct);
  yield takeLatest(deleteCategory.type, handledeleteCategory);
  yield takeLatest(getSequence.type, handlesequenceProduct);
  yield takeLatest(updateSequence.type, handleorderProduct);
  yield takeLatest(paginateProduct.type, handlePaginateProduct);
  yield takeLatest(paginateCategory.type, handlePaginateCategory);
  yield takeLatest(paginateSequence.type, handlePaginateSequence);
  yield takeLatest(sendMail.type, handleSendMail);
  yield takeLatest(searchCategory.type, handleSearchData);
  yield takeLatest(searchProduct.type, handleSearchProduct);
  yield takeLatest(getCoupon.type, handleGetCoupon);
  yield takeLatest(updateCoupon.type, handleUpdateCoupon);
  yield takeLatest(sendOtp.type, handleSendOtp);
  yield takeLatest(checkOtp.type, handleCheckOtp);
}
