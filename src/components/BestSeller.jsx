//

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const BestSeller = () => {
  const ref = useRef(null);
  const slider = useRef();
  const [products, setProducts] = useState([]);

  // Fetch 10 random products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-m2tv.onrender.com/api/products/random"
        ); // adjust base URL
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  //  ScrollTrigger animation for heading
  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 1,
      top: "0%",
      scale: 1.25,
      duration: 2,
      scrollTrigger: {
        trigger: ref.current,
        start: "-350% top",
        end: "-250% top",
        scrub: 1,
      },
    });
  }, []);

  //  Slider controls
  const next = () => {
    gsap.to(slider.current, {
      left: "-100%",
      duration: 1,
      ease: "sine.inOut",
    });
  };

  const prev = () => {
    gsap.to(slider.current, {
      left: "0%",
      duration: 1,
      ease: "sine.inOut",
    });
  };

  return (
    <div className="w-full h-[80vh] bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      <div className="w-full relative h-44 flex justify-center">
        <h1
          ref={ref}
          className="text-5xl text-center text-white flex justify-center items-center py-14 font-semibold underline underline-offset-8 decoration-solid decoration-white decoration-2 absolute -top-32 opacity-0 scale-75"
        >
          Best Seller
        </h1>
      </div>

      {/*  Product slider */}
      <div
        ref={slider}
        className="h-[50vh] w-[200%] flex justify-around items-center relative"
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`} //  link to product details
              className={`${
                index % 2 !== 0 ? "mt-20" : ""
              } h-[35vh] w-[17vw] bg-white relative overflow-hidden group`}
            >
              <img
                src={product.images?.[0]} // assuming array of image URLs/Base64
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 left-0 h-full w-full bg-black/0 group-hover:bg-black/70 transition duration-500 flex flex-col items-center justify-center">
                <p className="text-white text-2xl opacity-0 group-hover:opacity-100 transition">
                  {product.name}
                </p>
                <hr className="text-white h-1 bg-white w-16 mt-2 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white text-center w-full">Loading products...</p>
        )}
      </div>

      {/*  Navigation buttons */}
      <button
        onClick={next}
        className="absolute top-1/2 right-0 bg-gray-900 text-white text-3xl px-2 py-5 opacity-50 font-semibold rounded hover:opacity-100"
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
      <button
        onClick={prev}
        className="absolute top-1/2 left-0 bg-gray-900 text-white text-3xl px-2 py-5 opacity-50 font-semibold rounded hover:opacity-100"
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
    </div>
  );
};

export default BestSeller;
