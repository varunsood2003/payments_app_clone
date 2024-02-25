import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const SendMoney = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState(id);
  const [message1, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [])
  
  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); 
    } 
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#fff] p-10 rounded-xl flex flex-col justify-center border-4 ">
          <div className="text-black font-extrabold text-5xl p-2">
            Send Money
          </div>
          <div className="text-black text-2xl">Sending To : {name}</div>
          <div className="py-4 text-xl">
            <h2 className="py-2">Amount in Rs</h2>
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="text"
              placeholder="100"
              className="p-2 rounded-xl border-2"
            />
          </div>
          <div>
            <button
              onClick={handleClick}
              className="bg-[#41e55d] w-full cursor-pointer text-xl px-2 py-1 border-2 rounded-xl"
            >
              Send
            </button>
            <div className="py-4">{message1}</div>
          </div>
          <div className="text-[#fd4141] w-full cursor-pointer">
            <button onClick={()=>{
              navigate("/dashboard");
            }}>Cancel / Go Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
