import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="container">
      <h2>Welcome to our website!</h2>
      <div className="btnContainer">
        <Link to="/login">
          <button className="loginBtn">Login</button>
        </Link>
        <Link to="/register">
          <button className="registerBtn">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
