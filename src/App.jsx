import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import FogetPassword from "./Components/FogetPassword/FogetPassword";
import PasswoddReset from "./Components/PasswoddReset/PasswoddReset";
import VerifyCode from "./Components/VerifyCode/VerifyCode";

import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AllOrders from "./Components/AllOrders/AllOrders";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import CashPayment from "./Components/CashPayment/CashPayment";

import WishList from "./Components/WishList/WishList";
import { ToastContainer } from "react-toastify";
import Address from "./Components/Address/Address";
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      { path: "login", element: <Login /> },
      ,

      { path: "password-reset", element: <PasswoddReset /> }
      ,

      { path: "verify-code", element: <VerifyCode /> },
      
      { path: "forget-password", element: <FogetPassword /> },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "product-details/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "category-details/:id",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands-details/:id",
        element: (
          <ProtectedRoute>
            <BrandsDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cashpayment/:id",
        element: (
          <ProtectedRoute>
            <CashPayment />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "address/:id",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },

      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} theme="light" />
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
