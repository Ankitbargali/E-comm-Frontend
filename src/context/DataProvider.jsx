import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API = "https://ecommerce-backend-m2tv.onrender.com";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [product, setProduct] = useState();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [wish, setWish] = useState([]);
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchUser();
    fetchUserOrders();
    fetchCategory();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/api/products`);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API}/api/user`, {
        withCredentials: true,
      });

      if (res.data.user) {
        setUser(res.data.user);
        setCart(res.data.user.cart || []);
        setWish(res.data.user.wishlist || []);
      } else {
        setUser(null);
        setCart([]);
        setWish([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`${API}/api/orders`, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${API}/api/categories`);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        product,
        setProduct,
        cart,
        setCart,
        fetchUser,
        user,
        setUser,
        wish,
        setWish,
        orders,
        category,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
