import React from "react";

const Dashboard = ({ setAuth }) => {
  return (
    <>
      <div>Dashboard</div>
      <button
        onClick={() => {
          setAuth(false);
        }}
      >
        Log Out
      </button>
    </>
  );
};

export default Dashboard;
