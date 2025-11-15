import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { Link, useNavigate } from "react-router-dom";

const UserOrders = () => {
  const { orders, user } = useContext(DataContext); // Assume orders are in context
  const navigate = useNavigate();

  if (!user) {
    navigate("/Login");
  }
  return (
    <>
      <div className="h-16" />
      <div className="px-8 py-10 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-6 border-b pb-2">MY ORDERS</h1>

        <div className="space-y-6">
          {orders.map((order) =>
            order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Image & Details */}
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-md font-semibold py-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm py-1">
                      <span className="font-medium text-gray-800">
                        ${item.variant.newPrice}
                      </span>{" "}
                      Quantity: {item.quantity} &nbsp; | Size:{" "}
                      {item.variant.size}
                    </p>
                    <div className="flex gap-28">
                      <p className="text-sm text-gray-500">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Payment: {order.paymentMethod.toUpperCase()}
                      </p>
                      <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                        {order.orderStatus || "Out for Delivery"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status and Button */}
                <div className="flex flex-col items-end gap-2">
                  <button className="border border-gray-400 text-sm rounded px-3 py-1 hover:bg-gray-100">
                    Track Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserOrders;
