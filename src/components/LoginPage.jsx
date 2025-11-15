import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, NavLink, useSubmit, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DataContext } from "../context/DataProvider";

const LoginPage = () => {
  const [user, setUser] = useState("User");

  const gsaphii = useRef();
  const gsaplogin = useRef();
  const gsapcreate = useRef();
  const gsapwel = useRef();

  const [createX, setcreateX] = useState("0%");
  const [createZ, setcreateZ] = useState(0);

  const [welX, setwelX] = useState("0%");
  const [welZ, setwelZ] = useState(0);

  const [hiiX, sethiiX] = useState("0%");
  const [hiiZ, sethiiZ] = useState(10);

  const [loginX, setloginX] = useState("0%");
  const [loginZ, setloginZ] = useState(10);

  function handleAnimation2() {
    sethiiX("0%");
    setcreateX("0%");
    sethiiZ(30);
    setwelZ(0);
    setloginX("0%");
    setwelX(0);
    setloginZ(30);
    setcreateZ(0);
  }

  function handleAnimation() {
    setcreateX("100%");
    sethiiX("-100");
    setcreateZ(20);
    sethiiZ(0);
    setwelX("-100%");
    setloginX("100%");
    setwelZ(20);
    setloginZ(0);
  }

  const changeUser = (event) => {
    setUser(event.target.value);
  };

  useGSAP(() => {
    gsap.to(gsapcreate.current, {
      x: createX,
      duration: 1.5,
      zIndex: createZ,
      ease: "power3.inOut",
    });
  }, [createX, createZ]);

  useGSAP(() => {
    gsap.to(gsaplogin.current, {
      x: loginX,
      duration: 1.5,
      zIndex: loginZ,
      ease: "power3.inOut",
    });
  }, [loginX, loginZ]);

  useGSAP(() => {
    gsap.to(gsapwel.current, {
      x: welX,
      duration: 1.5,
      zIndex: welZ,
      ease: "power3.inOut",
    });
  }, [welX, welZ]);

  useGSAP(() => {
    gsap.to(gsaphii.current, {
      x: hiiX,
      duration: 1.5,
      zIndex: hiiZ,
      ease: "power3.inOut",
    });
  }, [hiiX, hiiZ]);

  const { fetchUser } = useContext(DataContext);
  const navigate = useNavigate();

  const [create, setCreate] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCreate({ ...create, [e.target.name]: e.target.value });
    //adding value to the desired field
    setErrorMessage("");
  };

  const [errorMessage, setErrorMessage] = useState({
    errFields: "",
    errUsername: "",
    errEmail: "",
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!create.userName || !create.email || !create.password) {
      return setErrorMessage({ errFields: "Please fill all the fields" });
    }

    try {
      const response = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/users/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Send JSON data
          },
          body: JSON.stringify(create), // Convert object to JSON string
        }
      );
      const result = await response.json();
      // console.log("Success", result);
      if (!response.ok) {
        setErrorMessage({
          ...errorMessage,
          errUsername: result.errUsername,
          errEmail: result.errEmail,
        });
      }
    } catch (error) {
      // console.error("Error", error);
    }

    setCreate({
      userName: "",
      email: "",
      password: "",
    });
  };

  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    //adding value to the desired field
    setErrorMessage1("");
  };

  const [errorMessage1, setErrorMessage1] = useState({
    errLoginFields: "",
    errLogin: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.loginId || !loginData.password) {
      return setErrorMessage1({ errLoginFields: "Please fill all the fields" });
    }

    try {
      const response = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Send JSON data
          },
          credentials: "include",
          body: JSON.stringify(loginData), // Convert object to JSON string
        }
      );
      const result = await response.json();
      console.log("Success", result);
      if (!response.ok) {
        setErrorMessage1({
          errLogin: result.errlogin,
        });
      }
      // SUCCESS
      fetchUser(); // refresh context user
      navigate("/"); // redirect to home
    } catch (error) {
      console.error("Error", error);
    }
    setLoginData({
      loginId: "",
      password: "",
    });
    setUser("User");
  };

  return (
    <>
      <div className="big-box  h-[100vh] w-full flex justify-center items-center bg-slate-800">
        <div className=" box h-[70vh] w-[70vw] bg-transparent flex relative mt-16">
          <div
            ref={gsaplogin}
            className="login h-full w-1/2 bg-white flex flex-col justify-center z-10"
          >
            <div className="text-center text-4xl font-semibold"> Sign In </div>
            <div className="flex justify-center gap-3 mt-5">
              <span className=" inline-block h-10 w-10  rounded-md items-center justify-center flex text-base hover:border-sky-500 hover:ring-2    bg-slate-200  hover:text-xl ">
                <i className="ri-google-fill"></i>
              </span>
              <span className=" inline-block h-10 w-10  rounded-md items-center justify-center flex text-base hover:border-sky-500 hover:ring-2     bg-slate-200 hover:text-xl">
                <i className="ri-facebook-fill"></i>
              </span>
              <span className=" inline-block h-10 w-10  rounded-md items-center justify-center flex text-base hover:border-sky-500 hover:ring-2     bg-slate-200 hover:text-xl">
                <i className="ri-github-fill"></i>
              </span>
              <span className=" inline-block h-10 w-10  rounded-md items-center justify-center flex text-base hover:border-sky-500 hover:ring-2     bg-slate-200 hover:text-xl">
                <i className="ri-linkedin-fill"></i>
              </span>
            </div>
            <div className="flex justify-center mb-3 mt-5">
              <p>Login With Email/Username</p>
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Enter Username/Email "
                value={loginData.loginId}
                name="loginId"
                onChange={(e) => {
                  changeUser(e);
                  handleLoginChange(e);
                }}
                className=" w-[75%] h-10 p-3 rounded-md border-gray-500 bg-gray-300 border-[1.5px] focus:border-sky-500 focus:outline-none  focus:ring-1 placeholder:text-gray-600"
              />
            </div>
            <div className="flex justify-center mt-5">
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Enter Password"
                className=" w-[75%] h-10 p-3 rounded-md  border-gray-500 bg-gray-300 border-[1.5px]  focus:border-sky-600 focus:outline-none  focus:ring-1  placeholder:text-gray-600"
              />
            </div>
            {errorMessage1.errLoginFields && (
              <p className="text-red-600 text-sm text-right font-semibold mt-1 pr-20">
                {errorMessage1.errLoginFields}
              </p>
            )}
            {errorMessage1.errLogin && (
              <p className="text-red-600 text-sm text-right font-semibold mt-1 pr-20">
                {errorMessage1.errLogin}
              </p>
            )}
            <p className="text-center mt-5">
              <a href="/">Forget Password?</a>
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoginSubmit}
                className="h-10 w-[35%] bg-blue-500 rounded-xl font-bold text-white transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)]    "
              >
                SIGN IN
              </button>
            </div>
          </div>

          <div
            ref={gsapcreate}
            className="CreateAccount h-full w-1/2 bg-white flex flex-col justify-center absolute  left-0 "
          >
            <div className="text-center text-4xl font-semibold">
              {" "}
              Create Account{" "}
            </div>
            <div className="flex justify-center gap-3 mt-5">
              <span className=" inline-block h-10 w-10  rounded-md border-none  items-center justify-center flex text-base hover:border-sky-500 hover:ring-2 bg-slate-200  hover:text-xl ">
                <i className="ri-google-fill"></i>
              </span>
              <span className=" inline-block h-10 w-10  rounded-md border-none  items-center justify-center flex text-base hover:border-sky-500 hover:ring-2  bg-slate-200 hover:text-xl">
                <i className="ri-facebook-fill"></i>
              </span>
              <span className=" inline-block h-10 w-10  rounded-md border-none  items-center justify-center flex text-base hover:border-sky-500 hover:ring-2 bg-slate-200 hover:text-xl">
                <i className="ri-github-fill"></i>
              </span>
              <span className=" inline-block h-10 w-10  rounded-md border-none  items-center justify-center flex text-base hover:border-sky-500 hover:ring-2 bg-slate-200 hover:text-xl">
                <i className="ri-linkedin-fill"></i>
              </span>
            </div>
            <div className="flex justify-center mb-3 mt-5">
              <p>Register with E-mail</p>
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                name="userName"
                value={create.userName}
                onChange={handleChange}
                placeholder="UserName"
                className=" w-[75%] h-10 p-3 rounded-md border-none bg-gray-300 border-[1.5px] focus:border-sky-500 focus:outline-none  focus:ring-2 placeholder:text-gray-600"
              />
            </div>
            {errorMessage.errUsername && (
              <p className="text-red-600 text-sm text-right font-semibold mt-1 pr-20">
                {errorMessage.errUsername}
              </p>
            )}
            <div className="flex justify-center mt-5">
              <input
                type="text"
                name="email"
                value={create.email}
                onChange={handleChange}
                placeholder="Enter E-mail"
                className=" w-[75%] h-10 p-3 rounded-md  border-none bg-gray-300 border-[1.5px]  focus:border-sky-600 focus:outline-none  focus:ring-2  placeholder:text-gray-600"
              />
            </div>
            {errorMessage.errEmail && (
              <p className="text-red-600 text-sm text-right font-semibold mt-1 pr-20">
                {errorMessage.errEmail}
              </p>
            )}
            <div className="flex justify-center mt-5">
              <input
                type="password"
                name="password"
                value={create.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className=" w-[75%] h-10 p-3 rounded-md  border-none bg-gray-300 border-[1.5px]  focus:border-sky-600 focus:outline-none  focus:ring-2  placeholder:text-gray-600"
              />
            </div>
            {errorMessage.errFields && (
              <p className="text-red-600 text-sm text-right font-semibold mt-1 pr-20">
                {errorMessage.errFields}
              </p>
            )}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleCreateSubmit}
                className="h-10 w-[35%] bg-blue-500 rounded-xl font-bold text-white transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)]    "
              >
                SIGN UP
              </button>
            </div>
          </div>

          <div
            ref={gsaphii}
            className="Sign-up h-full w-1/2 bg-slate-500 flex flex-col gap-4 justify-center z-10 "
          >
            <div className="flex justify-center ">
              <h1 className="text-4xl font-medium">Hii {user}...</h1>
            </div>
            <p className=" text-xl font-normal text-center">
              If not already a user <br /> Join us for better experience
            </p>
            <div className="flex justify-center mt-2">
              <button
                onClick={handleAnimation}
                className="h-10 w-[35%] text-blue-500 rounded-xl border-blue-500 border-4 font-bold  transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)] hover:bg-blue-700 hover:text-white hover:border-blue-700  "
              >
                SIGN UP
              </button>
            </div>
          </div>

          <div
            ref={gsapwel}
            className="Sign-up h-full w-1/2 bg-slate-500 flex flex-col gap-4 justify-center absolute right-0 "
          >
            <div className="flex justify-center ">
              <h1 className="text-4xl font-medium">
                Welcome To <br /> Site NAmewa
              </h1>
            </div>
            <div>
              <p className=" text-xl font-normal text-center tracking-widest">
                If already a user{" "}
              </p>
              <p className="text-xl font-normal text-center ">
                Login with ID & Password{" "}
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <button
                onClick={handleAnimation2}
                className="h-10 w-[35%] text-blue-500 rounded-xl border-blue-500 border-4 font-bold  transition duration-1000 ease-in-out transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(59,130,246,1)] hover:bg-blue-700 hover:text-white hover:border-blue-700  "
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
