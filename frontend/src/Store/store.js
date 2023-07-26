import {configureStore, applyMiddleware,getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit'
import storeSlice from 'Reducer/statevalue'
import createSagaMiddleware from 'redux-saga';
import {watcherSaga} from 'saga/rootSaga'
const sagaMiddleware= createSagaMiddleware()

const reducer=combineReducers({
    tokenvalue:storeSlice.reducer
})
const store=configureStore({
  reducer,
  middleware:[sagaMiddleware]
})


sagaMiddleware.run(watcherSaga)
export default store
