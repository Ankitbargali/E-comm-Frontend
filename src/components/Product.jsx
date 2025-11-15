import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { useParams, useNavigate } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const { product, wish, setWish, fetchUser, user } = useContext(DataContext);
  const navigate = useNavigate();

  if (!product) return <p>Loading...</p>;

  const Product = product.find((item) => item._id === id);
  if (!Product)
    return <p className="pt-20 pl-5 text-4xl">Product Not Found - ERROR 404</p>;

  const [mainImg, setMainImg] = useState(Product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(Product.variants[0]);
  const [quantity, setQuantity] = useState(1);

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
          credentials: "include",
          headers: { "Content-Type": "application/json" },
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
      if (!response.ok) return console.error("Cart error:", data.error);
      fetchUser();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const WishlistSubmit = async (productId, variant) => {
    try {
      const res = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/wishlist/update",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, variant }),
        }
      );
      const data = await res.json();
      if (!res.ok) return console.error("Wishlist error:", data.message);
      setWish(data.wishlist);
      fetchUser();
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  const isWishlisted = wish.some(
    (item) =>
      item.product._id === Product._id &&
      item.variant.size === selectedVariant.size
  );

  return (
    <div className="pt-20 ">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-10">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-3">
          {Product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => setMainImg(img)}
              className="h-24 w-20 object-cover cursor-pointer border border-gray-300 hover:border-black"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <img src={mainImg} alt="" className="w-full object-contain" />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold">{Product.name}</h1>
              <p className="text-gray-500">{Product.brand}</p>
            </div>
            <i
              className={`ri-heart${
                isWishlisted ? "-fill text-red-600" : "-line text-gray-600"
              } text-3xl cursor-pointer`}
              onClick={() => {
                if (!user) return navigate("/Login");
                WishlistSubmit(Product._id, selectedVariant);
              }}
            />
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-3 text-lg">
            <span className="text-blue-600 font-semibold">
              ₹{selectedVariant.newPrice}
            </span>
            <span className="line-through text-gray-400">
              ₹{selectedVariant.oldPrice}
            </span>
            <span className="text-green-600 font-medium">
              (
              {Math.round(
                ((selectedVariant.oldPrice - selectedVariant.newPrice) /
                  selectedVariant.oldPrice) *
                  100
              )}
              % OFF)
            </span>
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-1 font-medium">Size:</p>
            <div className="flex gap-2">
              {Product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3 py-1 border rounded ${
                    selectedVariant.size === variant.size
                      ? "border-black font-semibold"
                      : "border-gray-300"
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center border px-2 rounded">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              onClick={() => {
                if (!user) return navigate("/Login");
                cartSubmit(
                  Product._id,
                  selectedVariant.size,
                  selectedVariant.newPrice,
                  selectedVariant.oldPrice,
                  quantity
                );
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>

          {/* Description */}
          <div>
            <p className="text-lg font-semibold mt-5 mb-2">Description</p>
            <p className="text-gray-700">{Product.description}</p>
            <ul className="mt-2 text-base text-gray-600 space-y-1">
              {Product.specifications.map((spec, i) => (
                <li key={i}>
                  <span className="font-semibold">{spec.key}:</span>{" "}
                  {spec.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
