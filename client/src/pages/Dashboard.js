import React, { Fragment, useState, useEffect } from "react";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const res = await response.json();
      setName(res.userData.username);
    } catch (error) {
      console.log(error);
    }
  };

  const onlogOut = (e) => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <Fragment>
      <h1 className="text-center">Dashboard</h1>
      <p>Hello {name}</p>
      <button
        onClick={(e) => {
          onlogOut(e);
        }}
      >
        Log Out
      </button>
    </Fragment>
  );
};

export default Dashboard;
