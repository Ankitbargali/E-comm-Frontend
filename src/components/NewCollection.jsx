import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DataContext } from "../context/DataProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const NewCollection = () => {
  const { product } = useContext(DataContext);
  const ref = useRef(null);
  const slider = useRef();
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
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
    });

    ScrollTrigger.refresh();

    return () => ctx.revert(); // Cleanup
  }, [product]);

  function next() {
    gsap.to(slider.current, {
      left: "-100%",
      duration: 1,
      ease: "sine.inOut",
    });
  }
  function prev() {
    gsap.to(slider.current, {
      left: "0%",
      duration: 1,
      ease: "sine.inOut",
    });
  }

  if (!product) {
    return <div>Loading....</div>;
  }

  //  Get the latest 10 products (assuming product array is oldest → newest)
  const latestProducts = product.slice(-10).reverse();

  return (
    <>
      <div className=" w-full h-[80vh] bg-gradient-to-b from-black to-slate-900  relative overflow-hidden ">
        <div className=" w-full relative h-44 flex justify-center">
          <h1
            ref={ref}
            className="text-5xl text-center text-white flex justify-center items-center py-14 font-semibold underline underline-offset-8 decoration-solid decoration-white decoration-2 absolute -top-32 opacity-0 scale-75"
          >
            New Collection
          </h1>
        </div>

        <div
          ref={slider}
          className="h-[50vh] w-[200%] flex justify-around items-center relative"
        >
          {latestProducts.map((item, index) => (
            <Link
              to={`/product/${item._id}`}
              key={item._id}
              className={`h-[35.2vh] w-[17vw] bg-white relative overflow-hidden }`}
            >
              <img
                className="object-cover h-full w-full"
                src={item.images?.[0]}
                alt={item.name}
              />
              <div className="h-full w-full absolute top-0 hover:bg-black/70">
                <p className="text-center text-2xl text-white flex justify-center items-center flex-col h-full w-full opacity-0 hover:opacity-100 transition duration-800">
                  {item.name}
                  <hr className="text-white h-1 bg-white w-16 mt-2" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={next}
          className="absolute top-1/2 right-0 bg-gray-900 text-white text-3xl  px-2 py-5 opacity-50 font-semibold rounded hover:opacity-100"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
        <button
          onClick={prev}
          className="absolute top-1/2 left-0 bg-gray-900 text-white text-3xl  px-2 py-5 opacity-50 font-semibold rounded hover:opacity-100"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
      </div>
    </>
  );
};

export default NewCollection;
