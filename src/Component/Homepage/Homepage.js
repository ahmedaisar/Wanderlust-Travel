import { Link } from "react-router-dom";
import Styles from "./Homepage.module.css";
import logo from "./logo.png";
function Homepage() {
  return (
    <div className={Styles.container}>
      <div className={Styles.navbar}>
        <ul className={Styles.navWrapper}>
          <li className={Styles.navLinks}>
            <Link to="/login">Login</Link>
          </li>
          <li className={Styles.navLinks}>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
      <div className={Styles.welcomeMessage}>
        <img src={logo} alt="logo" width="100" height="100" />
        <h1 className={Styles.name}>Wanderlust</h1>
        <p>Welcome to our website!</p>
      </div>
    </div>
  );
}

export default Homepage;
