import React, { useState } from "react";
import { Redirect } from "react-router";
import Styles from "./Login.module.css";
import fire from "../../firebase.js";

const Login = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    var email = document.querySelector("#email_input").value;
    var password = document.querySelector("#password_input").value;

    if (email.split("").includes(" ") || password.split("").includes(" ")) {
      alert("Please enter credentials without blank spaces!");
    } else {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          setCurrentUser(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={Styles.container}>
      <form onSubmit={(e) => handleLogin(e)}>
        <input placeholder="Enter Email" id="email_input" required />
        <input
          type="password"
          placeholder="Enter Password"
          id="password_input"
          required
        />
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
