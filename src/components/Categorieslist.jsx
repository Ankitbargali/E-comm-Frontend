import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom"; //  for navigation

import fashion from "../assets/Images/fashion.jpg";
import phones from "../assets/Images/phones.jpg";
import laptop from "../assets/Images/laptop.jpg";
import games from "../assets/Images/games.jpg";

gsap.registerPlugin(ScrollTrigger);

const Categorieslist = () => {
  const ref = useRef(null);
  const navigate = useNavigate(); //  initialize navigate

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

  //  categories data to map dynamically
  const categories = [
    { name: "Fashion", image: fashion },
    { name: "Phone", image: phones },
    { name: "Laptop", image: laptop },
    { name: "Electronics", image: games },
  ];

  //  handle click to navigate with query param
  const handleCategoryClick = (categoryName) => {
    navigate(`/search?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="w-full h-[80vh] bg-gradient-to-b from-black to-slate-900">
      <div className="w-full relative h-44 flex justify-center">
        <h1
          ref={ref}
          className="text-5xl text-center text-white flex justify-center items-center py-14 font-semibold underline underline-offset-8 decoration-solid decoration-white decoration-2 absolute -top-32 opacity-0 scale-75"
        >
          CATEGORIES
        </h1>
      </div>

      <div className="h-[50vh] w-full flex justify-around items-center">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.name)} //  click handler
            className="h-[35.2vh] w-[17%] bg-white relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="object-cover h-full w-full"
            />
            <div className="h-full w-full absolute top-0 hover:bg-black/70 transition duration-700">
              <p className="text-center text-4xl text-white flex justify-center items-center flex-col h-full w-full opacity-0 hover:opacity-100 transition duration-800">
                {cat.name}
                <hr className="text-white h-1 bg-white w-20 mt-2" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorieslist;
