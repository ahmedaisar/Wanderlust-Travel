import { Link } from "react-router-dom";
import Styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={Styles.container}>
      <h2>Welcome to our website!</h2>
      <div className={Styles.btnContainer}>
        <Link to="/login">
          <button className={Styles.btnContainer}>Login</button>
        </Link>
        <Link to="/register">
          <button className={Styles.btnContainer}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
