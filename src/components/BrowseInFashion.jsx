import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import men from "../assets/Images/men.jpg";
import women from "../assets/Images/women.jpg";
import kids from "../assets/Images/kids.jpg";
import sneaker from "../assets/Images/sneaker.jpg";
import watch from "../assets/Images/watch.jpg";

gsap.registerPlugin(ScrollTrigger);

const BrowseInFashion = () => {
  const ref = useRef(null);

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
        // markers: true,
      },
    });
  }, []);

  return (
    <>
      <div className=" w-full h-[80vh] bg-gradient-to-b from-black to-slate-900  ">
        <div className=" w-full relative h-44 flex justify-center">
          <h1
            ref={ref}
            className="text-5xl text-center text-white flex justify-center items-center py-14 font-semibold underline underline-offset-8 decoration-solid decoration-white decoration-2 absolute -top-32 opacity-0 scale-75"
          >
            Browse In Fashion
          </h1>
        </div>

        <div className="h-[50vh] w-full flex justify-around items-center">
          <div className=" h-[35.2vh] w-[17%] bg-white relative  overflow-hidden">
            <img className="bg-cover absolute " src={men} alt="" />
            <div className="h-full w-full absolute top-0 hover:bg-black/70">
              <p className="text-center text-4xl text-white  flex justify-center items-center flex-col h-full w-ful opacity-0 hover:opacity-100 transition duration-800">
                Men <hr className="text-white h-1 bg-white w-20 " />
              </p>
            </div>
          </div>
          <div className=" h-[35.2vh] w-[17%] bg-white relative  overflow-hidden ">
            <img className=" bg-cover h-full w-full" src={women} alt="" />
            <div className="h-full w-full absolute top-0 hover:bg-black/70">
              <p className="text-center text-4xl text-white  flex justify-center items-center flex-col h-full w-full opacity-0 hover:opacity-100 transition duration-800">
                Women <hr className="text-white h-1 bg-white w-20 " />
              </p>
            </div>
          </div>
          <div className="  h-[35.2vh] w-[17%] bg-white relative  overflow-hidden  ">
            <img className=" h-ful w-full absolute " src={kids} alt="" />
            <div className="h-full w-full absolute top-0 hover:bg-black/70">
              <p className="text-center text-4xl text-white  flex justify-center items-center flex-col h-full w-full opacity-0 hover:opacity-100 transition duration-800">
                Kids <hr className="text-white h-1 bg-white w-16 " />
              </p>
            </div>
          </div>
          <div className=" h-[35.2vh] w-[17%] bg-white relative  overflow-hidden ">
            <img className=" h-full w-full absolute " src={sneaker} alt="" />
            <div className="h-full w-full absolute top-0 hover:bg-black/70">
              <p className="text-center text-4xl text-white  flex justify-center items-center flex-col h-full w-full opacity-0 hover:opacity-100 transition duration-800">
                Shoes <hr className="text-white h-1 bg-white w-16 " />
              </p>
            </div>
          </div>
          <div className=" h-[35.2vh] w-[17%] bg-white relative  overflow-hidden  ">
            <img className=" h-ful w-full absolute " src={watch} alt="" />
            <div className="h-full w-full absolute top-0 hover:bg-black/70">
              <p className="text-center text-4xl text-white  flex justify-center items-center flex-col h-full w-full opacity-0 hover:opacity-100 transition duration-800">
                Watch & Accessories
                <hr className="text-white h-1 bg-white w-20 " />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseInFashion;
