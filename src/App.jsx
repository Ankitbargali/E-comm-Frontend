import { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AboutUS from "./components/AboutUS";
import Categrories from "./components/Categrories";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Search from "./components/Search";
import Checkout from "./components/Checkout";
import UserOrders from "./components/UserOrders";
import AdminLayout from "./components/admin/pages/AdminLayout";
import Add from "./components/admin/pages/Add";
import ListItem from "./components/admin/pages/ListItem";
import Orders from "./components/admin/pages/Orders";
import AddCategory from "./components/admin/pages/AddCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/Categories",
    element: (
      <>
        <Navbar />
        <Categrories />
      </>
    ),
  },
  {
    path: "/About",
    element: (
      <>
        <Navbar />
        <AboutUS />
      </>
    ),
  },
  {
    path: "/Wishlist",
    element: (
      <>
        <Navbar />
        <Wishlist />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },
  {
    path: "/Login",
    element: (
      <>
        <Navbar />
        <LoginPage />
      </>
    ),
  },
  {
    path: "/Product/:id",
    element: (
      <>
        <Navbar />
        <Product />
      </>
    ),
  },
  {
    path: "/admin",
    element: <Navigate to="/admin/add" replace />,
  },
  {
    path: "/admin/add",
    element: (
      <AdminLayout>
        <Add />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/items",
    element: (
      <AdminLayout>
        <ListItem />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminLayout>
        <Orders />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/addCategory",
    element: (
      <AdminLayout>
        <AddCategory />
      </AdminLayout>
    ),
  },
  {
    path: "/Search",
    element: (
      <>
        <Navbar />
        <Search />
      </>
    ),
  },
  {
    path: "/Checkout",
    element: (
      <>
        <Navbar />
        <Checkout />
      </>
    ),
  },
  {
    path: "/orders",
    element: (
      <>
        <Navbar />
        <UserOrders />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
