import { Link } from "react-router-dom";
import Styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.message}>Wanderlust!</h1>
      <div className={Styles.btnContainer}>
        <Link to="/login">
          <button className={Styles.btn}>Login</button>
        </Link>
        <Link to="/register">
          <button className={Styles.btn}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
