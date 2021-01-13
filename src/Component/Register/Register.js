import Styles from "./Register.module.css";
import fire from "../../firebase.js";

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
      <h3 className={Styles.heading}>REGISTER ACCOUNT</h3>
      <form onSubmit={(e) => handleRegister(e)}>
        <div className={Styles.fieldContent}>
          <label htmlFor="firstName_input" className={Styles.label}>
            First Name
          </label>
          <input
            placeholder="First Name"
            id="firstName_input"
            className={Styles.input}
            size="50"
            required
          />
        </div>
        <div className={Styles.fieldContent}>
          <label htmlFor="lastName_input" className={Styles.label}>
            Last Name
          </label>
          <input
            placeholder="Last Name"
            id="lastName_input"
            className={Styles.input}
            required
          />
        </div>
        <div className={Styles.fieldContent}>
          <label htmlFor="email_input" className={Styles.label}>
            Email
          </label>
          <input
            placeholder="Enter Email"
            id="email_input"
            className={Styles.input}
            required
          />
        </div>
        <div className={Styles.fieldContent}>
          <label htmlFor="password1_input" className={Styles.label}>
            Enter Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password1_input"
            className={Styles.input}
            required
          />
        </div>
        <div className={Styles.fieldContent}>
          <label htmlFor="password2_input" className={Styles.label}>
            Enter Password Again
          </label>
          <input
            type="password"
            placeholder="Enter Password Again"
            id="password2_input"
            className={Styles.input}
            required
          />
        </div>
        <button className={Styles.registerBtn}>
          <b>SUBMIT</b>
        </button>
      </form>
    </div>
  );
};

export default Register;
