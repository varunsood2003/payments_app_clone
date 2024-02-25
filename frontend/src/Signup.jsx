import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errormsg, setErrorMsg] = useState("");
  const handleSignup = async () => {
    const response = await axios
      .post("http://localhost:3000/api/v1/user/signup", {
        username,
        password,
        firstName,
        lastName,
      })
      .catch(function (error) {
        setErrorMsg("Email already taken / Incorrect inputs");
      });
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };
  return (
    <div className="bg-slate-800 flex flex-col justify-center items-center h-screen">
      <div className="bg-white rounded-2xl  ">
        <div className="flex flex-col justify-center items-center p-6">
          <div className="text-5xl p-2">Sign Up</div>
          <div className="text-xl text-[#292828] ">
            Enter the information to create an account
          </div>
          <div className= "text-[#FF0000]">
            <p>{errormsg}</p>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="p-2">
            <label className="p-2">First Name</label>
            <input
              type="text"
              className="border-2 rounded-3xl"
              placeholder=" varun"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="p-2">
            <label className="p-2">Last Name</label>
            <input
              type="text"
              className="border-2 rounded-3xl"
              placeholder=" sood"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="p-2">
            <label className="p-2">Email</label>
            <input
              type="text"
              className="border-2 rounded-3xl"
              placeholder=" name@email.com"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="p-2 mb-2">
            <label className="p-2">Password</label>
            <input
              type="text"
              className="border-2 rounded-3xl"
              placeholder=" xyz123*"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="m-4 p-2 flex justify-center items-center border rounded-xl bg-black text-white ">
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div className="mb-2 flex justify-center items-center">
          <p>Already have an account ? </p>
          <button onClick={(e)=>{
            navigate("/signin")
          }}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
