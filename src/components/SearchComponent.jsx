import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const searchIconRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch) {
      gsap.to(searchIconRef.current, {
        x: -352,
        duration: 1.55,
        ease: "expo.inOut",
      });

      gsap.to(searchInputRef.current, {
        width: "380px",
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(searchIconRef.current, {
        x: 0,
        duration: 1,
        ease: "expo.inOut",
      });

      gsap.to(searchInputRef.current, {
        width: "0px",
        opacity: 0,
        duration: 0.6,
        ease: "expo.inOut",
      });
    }
  }, [showSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/Search?query=${search.trim()}`);
    }
    setSearch("");
  };

  return (
    <div className="relative flex items-center cursor-pointer">
      {/* Search Icon */}
      <div
        ref={searchIconRef}
        onClick={() => setShowSearch(true)}
        className={`cursor-pointer z-30 ${
          !showSearch ? "hover:text-2xl" : "text-gray-500 font-semibold"
        }`}
      >
        <i className="ri-search-line"></i>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          ref={searchInputRef}
          placeholder="Search for Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`absolute -top-2 right-0 px-10 py-2 rounded-full text-black border border-gray-300 focus:outline-none transition-all w-0 opacity-0`}
        />
      </form>

      {/* Close Button */}
      <div
        className={`font-semibold absolute right-4 text-black ${
          showSearch ? "visible" : "hidden"
        }`}
        onClick={() => setShowSearch(false)}
      >
        X
      </div>
    </div>
  );
};

export default SearchComponent;
