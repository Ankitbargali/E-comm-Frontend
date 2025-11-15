import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wish, fetchUser, user } = useContext(DataContext);

  const cartSubmit = async (
    productId,
    size,
    newPrice,
    oldPrice,
    quantity = 1
  ) => {
    try {
      const response = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/cart/add",
        {
          method: "POST",
          credentials: "include", // Send cookies for authentication
          headers: { "Content-Type": "application/json" }, // Fixed extra space
          body: JSON.stringify({
            productId,
            variant: {
              size,
              newPrice: Number(newPrice),
              oldPrice: Number(oldPrice),
            },
            quantity: Number(quantity),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error updating cart:", data.error || "Unknown error");
        return;
      }
      fetchUser();
      console.log("Cart updated:", data);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromWishlist = async (productId, variant) => {
    await axios.post(
      "https://ecommerce-backend-m2tv.onrender.com/api/wishlist/update",
      { productId, variant },
      { withCredentials: true }
    );

    fetchUser(); // Refresh
  };

  const navigate = useNavigate();

  if (!user) {
    navigate("/Login");
  }

  return (
    <>
      <div className="h-16" />
      <div>
        <div className="px-6 py-10">
          <h1 className="text-3xl font-semibold  text-center">Wishlist</h1>
          <p className="  mb-6 text-center">{wish.length} Items</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wish.length === 0 ? (
              <p>Wishlist is empty</p>
            ) : (
              wish.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg shadow-sm p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={
                      product.product.images?.[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                    className="w-40 h-40 object-cover mb-4"
                  />
                  <h2 className="text-lg font-medium mb-1">
                    {product.product.name.length > 31
                      ? product.product.name.slice(0, 31) + "..."
                      : product.product.name}
                  </h2>
                  {product.variant?.size && (
                    <p className="text-sm text-gray-600 mb-1">
                      Size: {product.variant.size}
                    </p>
                  )}
                  <p className="text-md font-semibold mb-4">
                    ₹{product.variant?.newPrice || product.price}
                  </p>
                  <button
                    onClick={() =>
                      cartSubmit(
                        product.product._id,
                        product.variant.size,
                        product.variant.newPrice,
                        product.variant.oldPrice,
                        1
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded mb-2 hover:bg-red-700"
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={() =>
                      removeFromWishlist(product.product._id, product.variant)
                    }
                    className="text-sm text-gray-500 underline hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
