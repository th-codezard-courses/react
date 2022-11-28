import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./features/ui/Layout";
import Products from "./features/products/Products";
import NewProduct from "./features/products/NewProduct";
import EditProduct from "./features/products/EditProduct";
import Orders from "./features/cart/Orders";
import Cart from "./features/cart/Cart";
import ProductDetails from "features/products/ProductDetails";
import { Toast, ToastContainer } from "react-bootstrap";
import { capitalize } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "features/ui/uiSlice";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.ui.alert);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="products" element={<Products />}></Route>
            <Route path="products/new" element={<NewProduct />}></Route>
            <Route path="products/:id" element={<ProductDetails />}></Route>
            <Route path="products/:id/edit" element={<EditProduct />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="/" element={<Navigate to="/products" />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-end"
        containerPosition="fixed"
        className="p-3"
      >
        <Toast
          onClose={() => dispatch(clearAlert())}
          show={Boolean(alert)}
          delay={3000}
          autohide
          bg={alert?.type}
        >
          <Toast.Header>
            <strong className="me-auto">{capitalize(alert?.type)}</strong>
          </Toast.Header>
          <Toast.Body>{alert?.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;
