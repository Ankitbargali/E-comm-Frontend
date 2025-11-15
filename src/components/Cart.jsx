import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, user } = useContext(DataContext);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.variant?.oldPrice * item.quantity,
    0
  );
  const discountedPrice = cart.reduce(
    (acc, item) =>
      acc + (item.variant?.oldPrice - item.variant?.newPrice) * item.quantity,
    0
  );
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.variant?.newPrice * item.quantity,
    0
  );

  const updateCartQuantity = async (productId, quantity, size) => {
    try {
      const response = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/cart/update",
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity, size }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCart(data); // Update cart state
      } else {
        console.error("Error updating quantity:", data.error);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      const response = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/cart/remove",
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, size }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Cart Updated:", data);
        setCart(data); // Update state after removal
      } else {
        console.error("Error removing item:", data.error);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  if (!user) {
    navigate("/Login");
  }

  return (
    <>
      <div>
        <div className="h-16"></div>
        <div className="flex h-[90.7vh] items-center">
          <div className="cartItem px-12 py-10 w-2/3 h-full">
            <p className="text-2xl font-semibold mb-8 text-center underline underline-offset-8">
              YOUR CART ITEMS
            </p>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="border-t-gray-300 border-t-2 w-full h-36 py-3 px-3 cursor-default flex"
                >
                  <Link to={`/product/${item?.product?._id}`}>
                    <div className="w-28 h-28 overflow-hidden mr-3 border-gray-500 border-2">
                      {item.product?.images?.length > 0 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="bg-cover"
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </div>
                  </Link>
                  <div className="h-full w-4/5 flex flex-col">
                    <div className="w-fit">
                      <Link
                        to={`/product/${item?.product?._id}`}
                        className="inline-block"
                      >
                        <p className="w-fit h-12 leading-5 text-xl font-semibold hover:underline hover:underline-offset-1">
                          {item.product?.name || "Product Not Found"}
                        </p>
                      </Link>
                    </div>
                    <div className="w-full h-2/3 flex gap-28 items-start py-2">
                      <div className="flex gap-2 w-auto">
                        <p className="text-xl font-medium text-gray-800">
                          ₹{item.variant?.newPrice || 0}.00
                        </p>
                        <p className="text-base font-medium text-gray-500 pt-1 line-through">
                          ₹{item.variant?.oldPrice || 0}.00
                        </p>
                        {item.variant?.oldPrice && item.variant?.newPrice ? (
                          <p className="text-base font-medium text-green-500 pt-1">
                            {Math.floor(
                              ((item.variant.oldPrice - item.variant.newPrice) /
                                item.variant.oldPrice) *
                                100
                            )}
                            % off
                          </p>
                        ) : null}
                      </div>
                      <p className="text-lg font-medium text-stone-800 bg-gray-300 w-auto p-1 h-12 rounded-md flex justify-center items-center">
                        {item.variant?.size || "N/A"}
                      </p>
                      <div className="flex">
                        <button
                          className="text-xl font-medium bg-gray-200 w-10 flex justify-center items-center pb-1 hover:bg-gray-300 rounded-l-lg cursor-pointer"
                          onClick={() =>
                            updateCartQuantity(
                              item.product._id,
                              item.quantity - 1,
                              item.variant?.size
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <div className="text-lg font-medium text-stone-800 bg-gray-400 w-12 h-12 flex justify-center items-center">
                          {item.quantity}
                        </div>
                        <button
                          className="text-xl font-medium bg-gray-200 w-10 flex justify-center items-center pb-1 hover:bg-gray-300 rounded-r-lg cursor-pointer"
                          onClick={() =>
                            updateCartQuantity(
                              item.product._id,
                              item.quantity + 1,
                              item.variant?.size
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-16 h-full flex mt-5 justify-center items-center"
                    onClick={() =>
                      removeFromCart(item.product._id, item.variant?.size)
                    }
                  >
                    <i className="ri-delete-bin-6-line text-2xl text-neutral-800 font-thin cursor-pointer hover:text-3xl hover:text-neutral-950"></i>
                  </div>
                </div>
              ))
            )}
          </div>

          {
            <div className="cartTotal py-10 px-8 bg-slate-200 border-l-2 border-t-2 border-b-2 border-gray-400 w-1/3 h-4/6 rounded-l-3xl fixed right-0 flex flex-col items-center">
              <p className="text-2xl font-semibold text-center underline underline-offset-8 decoration-2 mb-1">
                CART TOTAL
              </p>
              <div className="h-3/5 w-3/4 mt-8">
                <div className="h-12 w-full border-b-2 border-gray-400 flex items-end justify-between px-3">
                  <p className="text-lg font-light">
                    Subtotal ({cart.length} items)
                  </p>
                  <p className="font-normal">₹{subtotal}.00</p>
                </div>
                <div className="h-12 w-full border-b-2 border-gray-400 flex items-end justify-between px-3">
                  <p className="text-lg font-light">Discount</p>
                  <p className="font-normal">- ₹{discountedPrice}.00</p>
                </div>
                <div className="h-12 w-full border-b-2 border-gray-400 flex items-end justify-between px-3">
                  <p className="text-lg font-light">Delivery Fee</p>
                  <p className="font-normal">₹40.00</p>
                </div>
                <div className="h-10 w-full flex items-end justify-between px-3">
                  <p className="text-lg font-semibold">Total Amount - </p>
                  <p className="font-semibold text-lg">
                    ₹{totalAmount + 40}.00
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/Checkout")}
                className="bg-orange-400 py-4 mt-2 px-8 rounded-full text-lg font-medium cursor-pointer hover:bg-orange-500"
              >
                Proceed to Buy
              </button>
            </div>
          }
        </div>
      </div>
    </>
  );
};
export default Cart;
