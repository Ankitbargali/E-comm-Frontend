import React, { useEffect, useRef, useState } from "react";
import galaxys24 from "../assets/videos/galaxys24.mp4";
import ps5 from "../assets/videos/ps5.mp4";
import fashion from "../assets/videos/fashion.mp4";
import macbook1 from "../assets/videos/macbook1.mp4";
import gsap from "gsap";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Track current slide
  const gsapBannerContainer = useRef();

  // Video sources array
  const videos = [
    {
      src: ps5,
      title: "Play Station 5",
      title2: "Play LIke Never Before",
      description: "The Ultimate Gamng Machine",
      offer: "Avail benefits worth ₹9999*",
    },
    {
      src: galaxys24,
      title: "Samsung ",
      title2: "Galaxy S24 Ultra",
      description: "Galaxy AI is here",
      offer: "Avail benefits worth ₹9999*",
    },
    {
      src: macbook1,
      title: "Apple",
      title2: "MacBook Air 13",
      description: "Supercharged by M3",
      offer: "Avail benefits worth ₹4000*",
    },
    {
      src: fashion,
      title: "H&M",
      title2: "Men | Women | Kids",
      description: "Fashion & Quality at Best Price",
      offer: "Avail benefits worth ₹1200*",
    },
    {
      src: ps5,
      title: "Play Station 5",
      title2: "Play Like Never Before",
      description: "The Ultimate Gaming Machine",
      offer: "Avail benefits worth ₹9999*",
    },
    {
      src: galaxys24,
      title: "Samsung ",
      title2: "Galaxy S24 Ultra",
      description: "Galaxy AI is here ",
      offer: "Avail benefits worth ₹9999*",
    },
  ];

  // Function to go to the next video in an infinite loop
  const handleNextVideo = () => {
    let nextSlide = currentSlide + 1;

    gsap.to(gsapBannerContainer.current, {
      left: `-${nextSlide * 100}%`,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        if (nextSlide === videos.length - 1) {
          gsap.set(gsapBannerContainer.current, {
            left: `-${100}%`,
            duration: 0,
          });
          nextSlide = 1;
        }
        console.log(videos.length);
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
        if (prevslide === videos.length - 6) {
          gsap.set(gsapBannerContainer.current, {
            left: `-${400}%`,
            duration: 0,
          });
          prevslide = videos.length - 2;
        }
        console.log("prev " + prevslide);
        setCurrentSlide(prevslide);
      },
    });
  };

  return (
    <>
      <div className="h-16" />
      <div className="h-[91vh] w-full relative overflow-hidden bg-black">
        <div
          ref={gsapBannerContainer}
          className="flex w-[600%] h-[91vh] absolute left-[-100%]"
        >
          {videos.map((video, index) => (
            <div key={index} className="w-full h-full bg-black relative">
              <video
                src={video.src}
                autoPlay
                loop
                muted
                className="w-full h-full object-fill opacity-60"
              />
              <p className="absolute text-white font-normal leading-tight text-7xl top-6 left-5">
                {video.title}
              </p>
              <p className="absolute text-white font-normal leading-tight text-5xl top-28 left-5">
                {video.title2}
              </p>
              <p className="absolute text-white font-normal text-4xl right-10 bottom-40">
                {video.description}
              </p>
              <p className="absolute text-white font-normal text-3xl right-10 bottom-28">
                {video.offer}
              </p>
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

export default HeroBanner;
