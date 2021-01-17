import { Link } from "react-router-dom";
import Styles from "./Homepage.module.css";
import logo from "./logo.png";
function Homepage() {
  return (
    <div className={Styles.container}>
      <div className={Styles.navbar}>
        <ul className={Styles.navWrapper}>
          <li className={Styles.navLinks}>
            <Link to="/login">
              <b>Login</b>
            </Link>
          </li>
          <li className={Styles.navLinks}>
            <Link to="/register">
              <b>Register</b>
            </Link>
          </li>
        </ul>
      </div>
      <div className={Styles.welcomeMessage}>
        <img src={logo} alt="logo" width="100" height="100" />
        <h1 className={Styles.name}>Wanderlust</h1>
        <p>Stay with us, Feel at home.</p>
      </div>
    </div>
  );
}

export default Homepage;
