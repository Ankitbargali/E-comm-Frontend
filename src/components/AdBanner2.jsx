import React, { useEffect, useRef, useState } from "react";
import hpbanner from "../assets/Images/hpbanner.jpg";
import iqoobanner from "../assets/Images/iqoobanner.jpg";
import lehengabanner from "../assets/Images/lehengabanner.jpg";
import sneakerbanner from "../assets/Images/sneakerbanner.jpg";
import gsap from "gsap";

const AdBanner2 = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Track current slide
  const gsapBannerContainer = useRef();

  // Video sources array
  const image = [
    { src: sneakerbanner },
    { src: hpbanner },
    { src: iqoobanner },
    { src: lehengabanner },
    { src: sneakerbanner },
    { src: hpbanner },
  ];

  // Function to go to the next video in an infinite loop
  const handleNextVideo = () => {
    let nextSlide = currentSlide + 1;

    gsap.to(gsapBannerContainer.current, {
      left: `-${nextSlide * 100}%`,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        if (nextSlide === image.length - 1) {
          gsap.set(gsapBannerContainer.current, {
            left: `-${100}%`,
            duration: 0,
          });
          nextSlide = 1;
        }
        console.log(image.length);
        console.log("next " + nextSlide);
        setCurrentSlide(nextSlide);
      },
    });
  };

  const handlePrevVideo = () => {
    let prevslide = currentSlide - 1;

    gsap.to(gsapBannerContainer.current, {
      left: `-${prevslide * 100}%`,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        if (prevslide === image.length - 6) {
          gsap.set(gsapBannerContainer.current, {
            left: `-${400}%`,
            duration: 0,
          });
          prevslide = image.length - 2;
        }
        console.log("prev " + prevslide);
        setCurrentSlide(prevslide);
      },
    });
  };

  return (
    <>
      <div className="h-[55vh] w-full relative overflow-hidden bg-black">
        <div
          ref={gsapBannerContainer}
          className="flex w-[600%] h-full absolute left-[-100%]"
        >
          {image.map((image, index) => (
            <div key={index} className="w-full h-full bg-black relative">
              <img src={image.src} className="w-full h-full object-fill " />
            </div>
          ))}
        </div>

        {/* Next Video Button */}
        <button
          onClick={handleNextVideo}
          className="absolute top-1/2 right-0 bg-gray-900 text-white text-3xl  px-2 py-5 opacity-50 font-semibold rounded hover:opacity-100"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>

        <button
          onClick={handlePrevVideo}
          className="absolute top-1/2 left-0 bg-gray-900 text-white text-3xl  px-2 py-5 opacity-50 font-semibold rounded hover:opacity-100"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
      </div>
    </>
  );
};

export default AdBanner2;
