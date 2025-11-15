import React from "react";
import Navbar from "../../Navbar";
import { NavLink } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <>
      {/* Top Navbar */}
      <Navbar />
      <div className="h-16"></div>

      {/* Main Admin Layout (below navbar) */}
      <div className="flex h-[calc(100vh-64px)] w-full">
        {/* LEFT SIDEBAR */}
        <div className="w-[22%] bg-blue-600 flex flex-col items-end py-10 px-4">
          {/* Add Item */}
          <NavLink
            to="/admin/add"
            className={({ isActive }) =>
              `
              w-3/4 h-12 mb-6 flex items-center justify-end pr-4
              rounded-l-md border-[2px] border-white font-semibold text-lg
              transition-all duration-300

              ${
                isActive
                  ? "bg-white text-[#053042]"
                  : "text-white hover:bg-white hover:text-[#053042]"
              }
            `
            }
          >
            Add Item
          </NavLink>

          {/* Item List */}
          <NavLink
            to="/admin/items"
            className={({ isActive }) =>
              `
              w-3/4 h-12 mb-6 flex items-center justify-end pr-4
              rounded-l-md border-[2px] border-white font-semibold text-lg
              transition-all duration-300

              ${
                isActive
                  ? "bg-white text-[#053042]"
                  : "text-white hover:bg-white hover:text-[#053042]"
              }
            `
            }
          >
            Item List
          </NavLink>

          {/* Orders */}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `
              w-3/4 h-12 mb-6 flex items-center justify-end pr-4
              rounded-l-md border-[2px] border-white font-semibold text-lg
              transition-all duration-300

              ${
                isActive
                  ? "bg-white text-[#053042]"
                  : "text-white hover:bg-white hover:text-[#053042]"
              }
            `
            }
          >
            Orders
          </NavLink>

          {/* Add Category */}
          <NavLink
            to="/admin/addCategory"
            className={({ isActive }) =>
              `
              w-3/4 h-12 mt-2 flex items-center justify-end pr-4
              rounded-l-md border-[2px] border-white font-semibold text-lg
              transition-all duration-300

              ${
                isActive
                  ? "bg-white text-[#053042]"
                  : "text-white hover:bg-white hover:text-[#053042]"
              }
            `
            }
          >
            Add Category
          </NavLink>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-100">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
