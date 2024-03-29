import React, { useState } from "react";
import { Redirect } from "react-router";
import Styles from "./Login.module.css";
import fire from "../../firebase.js";
import { Link } from "react-router-dom";
import background from "./login-page.jpg";
import logo from "./logo.png";

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
          setCurrentUser(user.user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode, errorMessage);
        });
    }
  };

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={Styles.container}>
      <img className={Styles.background} src={background} alt="login page" />
      <div className={Styles.formContainer}>
        <div className={Styles.headingContainer}>
          <img src={logo} alt="logo" width="100" height="100" />
          <h3>Wanderlust</h3>
        </div>
        <form className={Styles.form} onSubmit={(e) => handleLogin(e)}>
          <h2 className={Styles.heading}>Login</h2>
          <div className={Styles.fieldContent}>
            <label htmlFor="email_input">Email</label>
            <input
              placeholder="Enter Email"
              id="email_input"
              className={Styles.input}
              size="30"
              required
            />
          </div>
          <div className={Styles.fieldContent}>
            <label htmlFor="password_input">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password_input"
              className={Styles.input}
              autoComplete="off"
              required
            />
          </div>
          <button className={Styles.loginBtn}>
            <b>LOGIN</b>
          </button>
          <span className={Styles.signupBtn}>
            New User? <Link to="/register">Sign up</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
