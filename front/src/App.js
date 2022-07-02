import './App.css';

import store from './redux/store'
import { Provider } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import MyAccount from './components/MyAccount';
import Store from './components/Store';
import Cart from './components/Cart';
import Orders from './components/Orders';


function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/myAccount" element={<MyAccount />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
