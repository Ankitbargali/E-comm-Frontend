import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, cart, fetchUser } = useContext(DataContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: user?.address?.firstName || "",
    lastName: user?.address?.lastName || "",
    email: user?.email || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zip: user?.address?.zip || "",
    country: user?.address?.country || "",
    phone: user?.address?.phone || "",
  });

  const handlePlaceOrder = async () => {
    try {
      // Save Address
      const response = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/user/address",
        {
          method: "PUT",
          credentials: "include", // include cookies if used for auth
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to save address:", data.message);
        alert("Failed to save address: " + data.message);
        return;
      }
      // Place Order (Cash on Delivery)
      const orderResponse = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/Checkout/place",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ paymentMethod: "cod" }),
        }
      );

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.message);

      alert("Order placed successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
      });
      fetchUser();
      navigate("/Orders");
    } catch (error) {
      console.error("Order Error:", error.message);
      alert("Failed to place order: " + error.message);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.variant.newPrice * item.quantity,
    0
  );
  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  return (
    <>
      <div className="h-16" />
      <div className="min-h-screen bg-white p-6 flex justify-center items-start">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">
          {/* Left Column - Delivery Form */}
          <div className="space-y-6 h-full ">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">
              DELIVERY INFORMATION
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded text-sm w-full"
                />
                <input
                  type="text"
                  required
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded text-sm w-full"
                />
              </div>
              <input
                type="email
                required"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="px-3 py-2 border rounded text-sm w-full"
              />
              <input
                type="text"
                required
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="px-3 py-2 border rounded text-sm w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded text-sm w-full"
                />
                <input
                  type="text"
                  required
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded text-sm w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  name="zip"
                  placeholder="Zipcode"
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded text-sm w-full"
                />
                <input
                  type="text"
                  required
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="px-3 py-2 border rounded text-sm w-full"
                />
              </div>
              <input
                type="text"
                required
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="px-3 py-2 border rounded text-sm w-full"
              />
            </form>
          </div>

          {/* Right Column - Cart Summary & Payment */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">ORDER SUMMARY</h2>
            <div className="space-y-4 max-h-28 overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 border-b pb-2"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product._id}`}
                        className="text-sm font-semibold hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex gap-6">
                        <p className="text-xs text-gray-500">
                          Size: {item.variant.size}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    ₹{(item.variant.newPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold border-b pt-4 pb-2">
              CART TOTALS
            </h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <h3 className="text-md font-semibold border-b pb-2">
              PAYMENT METHOD
            </h3>
            <div className="flex gap-4">
              {["stripe", "razorpay", "cod"].map((method) => (
                <div
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`cursor-pointer px-5 py-3 border rounded-md flex items-center justify-center gap-2 transition-all duration-200 w-full
                  ${
                    paymentMethod === method
                      ? method === "cod"
                        ? "bg-green-100 border-green-500"
                        : "bg-blue-100 border-blue-500"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === method}
                    readOnly
                    className="accent-current"
                  />
                  <span className="capitalize font-medium">
                    {method === "cod"
                      ? "Cash on Delivery"
                      : method.charAt(0).toUpperCase() + method.slice(1)}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-4 bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-all"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
