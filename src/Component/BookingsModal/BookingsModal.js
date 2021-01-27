import { Modal, Button, Spinner } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth";
import Styles from "./BookingsModal.module.css";

const BookingsModal = ({ show, setShow }) => {
  const { currentUser } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState();
  const [loading, setLoading] = useState(true);
  var firebaseBaseURL = `https://kiitproject-1f1e2-default-rtdb.firebaseio.com/${currentUser.uid}`;
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetch(`${firebaseBaseURL}.json`)
      .then((res) => res.json())
      .then((data) => {
        setMyBookings(data);
        setLoading(false);
      });
  }, [firebaseBaseURL]);

  const cancelBooking = (e) => {
    let targetBooking = e.currentTarget.parentNode;
    if (window.confirm("Are you sure you want to cancel?")) {
      fetch(`${firebaseBaseURL}/${targetBooking.id}.json`, {
        method: "DELETE",
      })
        .then(alert("Your Booking was canceled. We have notified the Hotel."))
        .then(targetBooking.remove());
    }
  };

  const getHotelData = () => {
    if (myBookings !== undefined && myBookings !== null) {
      let data = Object.values(myBookings);
      let keys = Object.keys(myBookings);
      return data.map((item, index) => (
        <li key={keys[index]} id={keys[index]}>
          <p
            style={{
              fontSize: "22px",
              fontFamily: "Exo 2",
              textDecoration: "underline",
            }}
          >
            Hotel in {item.hotelCity.split("")[0].toUpperCase()}
            {item.hotelCity.split("").slice(1)}
          </p>
          <p style={{ fontSize: "18px", fontFamily: "Exo 2" }}>
            {item.hotelName}
          </p>
          <p style={{ fontFamily: "Lora" }}>
            From {item.checkinDate} to {item.checkoutDate}
          </p>
          <p style={{ fontFamily: "Lora" }}>
            {item.totalGuests} Guests, {item.roomType} x {item.totalRooms}
          </p>
          <p style={{ fontFamily: "Lora" }}>
            Payment done of &#x20b9;{item.totalPrice}
          </p>
          <p className={Styles.cancelButton} onClick={(e) => cancelBooking(e)}>
            Cancel
          </p>
          <hr></hr>
        </li>
      ));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>My Bookings</Modal.Title>
      </Modal.Header>
      {loading ? (
        <Spinner animation="grow" style={{ margin: "25% 48%" }} />
      ) : (
        <>
          <Modal.Body>
            <ul className={Styles.bookingList}>{getHotelData()}</ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default BookingsModal;
