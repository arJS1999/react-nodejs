import React,{Fragment} from 'react';
import Login from './OLD/User/login'
import App from './OLD/Category/app'
import Protected from './Navbar/protected'
import Signup from './OLD/User/signup'
import Phonenum from './OLD/excer/phone'
import Navbar from './Navbar/navbar'
import Root from './Navbar/root'
import Home from './OLD/Home/home'
import Product from './OLD/Allproduct/products'
import SingleProduct from './OLD/Allproduct/singleproduct'
import Cancel from './OLD/Cart/cancel'
import Admin from './OLD/Admin/addproduct1'
import Order from './OLD/Order/order'
import  Cart from './OLD/Cart/cart'
import { gettoken }   from './OLD/tokenauth/auth';
import Logout from './OLD/User/logout'
import { Routes, Route} from 'react-router-dom'
import Editcategory from './OLD/Admin/editcategory';
import Addcategory from './OLD/Admin/addcategory';
import { useState } from 'react';
import Success from './OLD/Order/success';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './Reducer/productreducer'
import Test from './test'
import Role from './OLD/tokenauth/role';


const store = createStore(reducer, applyMiddleware(thunk));


const Routemodule=()=> {
  const log = (bool) =>{
    setnav(bool);
    console.log(bool)
  }
  const [nav,setnav] = useState(false);
  return (
    <>    

    {/* <Navbar store={store}></Navbar> */}

      <Routes>        

        {/* <Route path="/" element={<Root/>}> */}
      <Route path='/' element={<Role/>}>
      <Route path ="/login" element={<Login state={log} />} />
      <Route path ="/signup" element={<Signup />} />
        <Route element={<Protected token={gettoken}/>}> 
        <Route path="/logout" element={ <Logout /> } />
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/cate' element={<App store={store}/>} />
          <Route path="/product" element={<Product/>}/>
          <Route path='/admin' element={<Admin/>} />
          <Route path="/" element={<Home />} />

        </Route>      
        <Route path="/order" element={<Order/>}/>

        <Route path="/singleprod/:name" element={<SingleProduct/>}/>
        <Route path="/editcategory/:name" element={<Editcategory/>}/>
        <Route path ="/test" element={<Test store={store} />} />
        <Route path="/addcategory" element={<Addcategory/>}/>
      <Route path='/payment/cancel' element={<Cancel/>} />
      <Route path='/payment/success' element={<Success/>} />

      <Route path="/phone" element={<Phonenum/>}/>
</Route>
{/* </Route> */}
</Routes>
</>

  );
}

export default Routemodule;
