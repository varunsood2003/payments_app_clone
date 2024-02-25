import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");
  const [userArray, setUserArray] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
        }
        const userData = await axios.get(
          "http://localhost:3000/api/v1/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const balanceData = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const allUsers = await axios.get(
          "http://localhost:3000/api/v1/user/bulk"
        );
        setUserArray(allUsers.data.user);
        setBalance(balanceData.data.balance.toFixed(2));
        setUser(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between pt-10 px-10 ">
        <div className="text-3xl font-extrabold">Payments App</div>
        <div>
        <div className="text-xl">Hello, {user.firstName} {user.lastName}</div>
        <button onClick={()=>{
          navigate("/signin")
        }} className="underline">Logout</button>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-700 border-0 dark:bg-gray-900"></hr>
      <div className="text-xl pl-10 font-bold mb-10">
        Your Balance {balance}
      </div>
      <div className="text-lg  px-10 flex">
        <div className="font-bold">Search User :</div>
        <input
          type="text"
          className="mx-2 border-2  rounded-xl"
          placeholder="First Name or Last Name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            const response = await axios.get(
              "http://localhost:3000/api/v1/user/bulk?filter=" + search
            );
            setUserArray(response.data.user);
          }}
          className="text-white bg-black rounded-xl p-1 "
        >
          Search
        </button>
      </div>
      {userArray.map((user1) => {
        if(user._id===user1._id)return null;
        return (
          <div key={user1._id} className="flex justify-between px-10 py-2">
            <p className="text-lg">
              {user1.firstName} {user1.lastName}
            </p>
            <button
              onClick={(e) => {
                navigate("/send?id=" + user1._id + "&name=" + user1.firstName);
              }}
              className="bg-black rounded-xl p-1 text-white cursor-pointer"
            >
              Send Money
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Dashboard;
