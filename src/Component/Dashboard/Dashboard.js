import React, { useState, useEffect } from "react";
import Styles from "./Dashboard.module.css";
import fire from "../../firebase.js";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      fire
        .auth()
        .signOut()
        .then(() => {
          setCurrentUser(null);
        });
    }
  };
  return (
    <>
      <h3 className={Styles.nav}>Hello from Dashboard</h3>
      <button onClick={() => handleLogout()}>Logout</button>
    </>
  );
};

export default Dashboard;
