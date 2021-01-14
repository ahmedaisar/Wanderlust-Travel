import Styles from "./Register.module.css";
import fire from "../../firebase.js";
import background from "./register-page.jpg";
import logo from "./logo.png";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    var firstName = document.querySelector("#firstName_input").value;
    var lastName = document.querySelector("#lastName_input").value;
    var email = document.querySelector("#email_input").value;
    var password1 = document.querySelector("#password1_input").value;
    var password2 = document.querySelector("#password2_input").value;
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      firstName.split("").includes(" ") ||
      lastName.split("").includes(" ") ||
      email.split("").includes(" ") ||
      password1.split("").includes(" ") ||
      password2.split("").includes(" ")
    ) {
      alert("Please enter credentials without blank spaces!");
    } else if (password1 !== password2) {
      alert("Your passwords doesn't match! Please try again.");
    } else if (mailformat.test(email) === false) {
      alert("Please enter valid email address!");
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password1)
        .then((result) => {
          result.user.updateProfile({ displayName: firstName });
        })
        .then(() => {
          alert("User Successfully Created!");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <div className={Styles.container}>
      <img class={Styles.background} src={background} alt="login page" />
      <div className={Styles.formContainer}>
        <div className={Styles.headingContainer}>
          <img src={logo} alt="logo" width="100" height="100" />
          <h3>Wanderlust</h3>
        </div>
        <form className={Styles.form} onSubmit={(e) => handleRegister(e)}>
          <h3 className={Styles.heading}>Create Account</h3>
          <input
            placeholder="First Name"
            id="firstName_input"
            className={Styles.input}
            size="40"
            required
          />
          <input
            placeholder="Last Name"
            id="lastName_input"
            className={Styles.input}
            required
          />
          <input
            placeholder="Enter Email"
            id="email_input"
            className={Styles.input}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            id="password1_input"
            className={Styles.input}
            required
          />
          <input
            type="password"
            placeholder="Repeat Password"
            id="password2_input"
            className={Styles.input}
            required
          />
          <button className={Styles.registerBtn}>
            <b>SIGN UP</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
