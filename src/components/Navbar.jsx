import React, { useEffect, useRef, useState, useContext } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const gsaplogoopacity = useRef();
  const gsaphomeopacity = useRef();
  const gsapcategoryopacity = useRef();
  const gsapaboutopacity = useRef();
  const gsapsearchopacity = useRef();
  const gsapheartopacity = useRef();
  const gsapcartopacity = useRef();
  const gsapprofileopacity = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3, opacity: 1, ease: "power1.inOut" },
    });

    tl.to(gsaplogoopacity.current, { opacity: 1, duration: 0.8 })
      .to(gsaphomeopacity.current, { opacity: 1 })
      .to(gsapcategoryopacity.current, { opacity: 1 })
      .to(gsapaboutopacity.current, { opacity: 1 })
      .to(gsapsearchopacity.current, { x: -45, duration: 0.5 })
      .to(gsapheartopacity.current, { x: -45, duration: 0.2 })
      .to(gsapcartopacity.current, { x: -45, duration: 0.2 })
      .to(gsapprofileopacity.current, { x: -45, duration: 0.2 });
  }, []);

  const { cart, user, setUser, wish, fetchUser } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  let userIcon = "";

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  if (user) {
    userIcon = user.userName.toUpperCase().substring(0, 1);
  }
  // console.log(user);

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    setUser(null);
    fetchUser();
  };

  const navigate = useNavigate();

  const handleWishlistClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/wishlist");
    }
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="text-white fixed w-full z-50  ">
      <div className=" w-full h-16 bg-gradient-to-r from-[#171718] to-[#000000] flex items-center justify-between px-12">
        <div
          ref={gsaplogoopacity}
          className="text-white font-bold text-3xl opacity-0 "
        >
          <NavLink to={"/"}>ShopEase</NavLink>
        </div>
        <div className="gap-5 flex justify-center ">
          <div
            ref={gsaphomeopacity}
            className="text-white font-medium text-lg opacity-0 "
          >
            <NavLink to={"/"}>Home</NavLink>
          </div>
          <div
            ref={gsapcategoryopacity}
            className="text-white font-medium text-lg opacity-0"
          >
            <NavLink to={"/Categories"}>Categories</NavLink>
          </div>
          <div
            ref={gsapaboutopacity}
            className="text-white font-medium text-lg opacity-0"
          >
            <NavLink to={"/About"}>AboutUs</NavLink>
          </div>
        </div>

        <div className="h-full max-w-48 flex items-center gap-4">
          <div
            ref={gsapsearchopacity}
            className="cursor-pointer flex items-center justify-center h-full w-12 opacity-0"
          >
            <SearchComponent />
          </div>

          <div
            ref={gsapheartopacity}
            className="hover:text-xl h-full w-12 flex items-center justify-center opacity-0 "
            onClick={handleWishlistClick}
          >
            <NavLink to={"/Wishlist"}>
              <i className="ri-heart-fill">
                {wish.length > 0 && (
                  <span className="absolute right-1 bottom-4 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {wish.length}
                  </span>
                )}{" "}
              </i>
            </NavLink>
          </div>
          <div
            ref={gsapcartopacity}
            className="hover:text-xl h-full w-12 flex items-center justify-center opacity-0"
            onClick={handleCartClick}
          >
            <NavLink to={"/Cart"}>
              <i className="ri-shopping-cart-2-fill hover:text-2xl">
                {cartItemCount > 0 && (
                  <span className="absolute right-1 bottom-4 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </i>
            </NavLink>
          </div>
          <div
            ref={gsapprofileopacity}
            className="flex items-center justify-center h-full w-12 opacity-0"
          >
            {user ? (
              <>
                <div
                  className="w-10 h-10 absolute flex justify-center items-center cursor-pointer"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <div className="bg-sky-600 w-7 h-7 rounded-full flex justify-center items-center  ">
                    {userIcon}
                  </div>
                </div>
                {isOpen && (
                  <div
                    className="dropdown absolute -bottom-32 -right-2 -mt-2 w-40 h-36 bg-gray-200 rounded-lg shadow-2xl"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <NavLink to={"/MyProfile"}>
                      <div className="px-3 py-3 border-b border-gray-400 hover:bg-blue-200 cursor-pointer text-black rounded-t-lg flex items-center gap-3">
                        <div className="w-5 h-5 border-black border rounded-full flex items-center justify-center">
                          <i className="ri-user-line mt-1"></i>
                        </div>
                        My Profile
                      </div>
                    </NavLink>
                    <NavLink to={"/Orders"}>
                      <div className="px-3 py-3 border-b border-gray-400 hover:bg-blue-200 cursor-pointer text-black flex items-center gap-3">
                        <i className="ri-box-3-line"></i>Orders
                      </div>
                    </NavLink>
                    <div
                      className="px-3 py-3 hover:bg-blue-200 cursor-pointer text-black rounded-b-lg flex items-center gap-3"
                      onClick={handleLogout}
                    >
                      <i className="ri-logout-box-r-line"></i>Logout
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NavLink to={"/LogIn"}>
                <i className="ri-user-fill hover:text-2xl"></i>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
