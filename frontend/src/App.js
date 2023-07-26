import Routemodule from "Routes/Routemodule";
// import { applyMiddleware } from 'redux';
import store from "Store/store";
import { Provider } from "react-redux";
import Navbar from "Navbar/navbar";
function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routemodule />
    </Provider>
  );
}

export default App;
