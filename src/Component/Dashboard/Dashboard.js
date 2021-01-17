import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Styles from "./Dashboard.module.css";
import fire from "../../firebase.js";
import SHA256 from "../../SHA256";
import { AuthContext } from "../../Auth";
import Hotel from "../Hotel/Hotel.js";
import logo from "./logo.png";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [searchedHotels, setSearchedHotels] = useState([]);

  const API_KEY = "c88483bc60e895cc24cee3534aa2363a";
  const API_SECRET = "eba306e165";
  let timestamp = Math.floor(Date.now() / 1000);
  const X_SIGNATURE = SHA256(`${API_KEY}${API_SECRET}${timestamp}`);

  useEffect(() => {
    let hotels_url =
      "https://cors-anywhere.herokuapp.com/api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&countryCode=IN&language=ENG&from=1&to=1000";
    console.log("Fetching Hotels....");

    fetch(hotels_url, {
      headers: {
        "Api-key": API_KEY,
        "X-Signature": X_SIGNATURE,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setHotels(data.hotels);
        console.log("Completed");
        setLoading(false);
      });
  }, []);
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      fire
        .auth()
        .signOut()
        .then(() => {
          setLoggedOut(true);
        });
    }
  };
  const searchHotels = (e) => {
    e.preventDefault();
    let searchInput = document.querySelector("#searchInput").value;
    const results = hotels.filter(
      (item) => item.city.content === searchInput.toUpperCase()
    );
    setSearchedHotels(results);
  };

  if (loggedOut) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <section className={Styles.searchNav}>
            <div className={Styles.nav}>
              <div className={Styles.logoWrapper}>
                <img src={logo} alt="logo" height="50" width="50" />
                <span>
                  <b>Wanderlust</b>
                </span>
              </div>
              <div className={Styles.buttons}>
                <Link to="/bookings">
                  <span>
                    <b>My Bookings</b>
                  </span>
                </Link>
                <span onClick={() => handleLogout()}>
                  <b>Logout</b>
                </span>
              </div>
            </div>
            <div className={Styles.welcomeMessage}>
              <h1>Welcome, {currentUser.displayName}</h1>
            </div>
            <div className={Styles.searchBox}>
              <form onSubmit={(e) => searchHotels(e)}>
                <input
                  id="searchInput"
                  placeholder="Enter the city..."
                  size="50"
                  className={Styles.searchInput}
                />
                <button className={Styles.searchBtn}>Search</button>
              </form>
            </div>
          </section>
          <section className={Styles.hotels}>
            <ul className={Styles.hotelsList}>
              {searchedHotels.length > 0
                ? searchedHotels.map((item) => (
                    <li key={item.code}>
                      <Hotel data={item} id={item.code} />
                    </li>
                  ))
                : null}
            </ul>
          </section>
        </>
      )}
    </>
  );
};

export default Dashboard;
