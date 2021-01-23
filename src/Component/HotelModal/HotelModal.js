import { Modal, Button, Carousel, Collapse } from "react-bootstrap";
import Styles from "./HotelModal.module.css";
import { useState } from "react";

const HotelModal = ({ data, show, setShow }) => {
  const handleClose = () => setShow(false);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  let image_baseURL = "http://photos.hotelbeds.com/giata/bigger/";

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  function getRandomPrice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var roomBasePrice = getRandomPrice(1200, 5000);

  const handleCheckout = () => {
    const guestsInput = document.querySelector("#guestsInput").value;
    const roomsInput = document.querySelector("#roomsInput").value;
    const checkinDate = document.querySelector("#checkinDate").value;
    const checkoutDate = document.querySelector("#checkoutDate").value;

    if (checkinDate === checkoutDate) {
      alert("Checkin and Checkout cannot be same day!");
    } else if (checkoutDate < checkinDate) {
      alert("Check-out date cannot be before Check-in!");
    } else if (
      roomsInput > guestsInput ||
      roomsInput < Math.ceil(guestsInput / 2)
    ) {
      alert("Insufficient Rooms Selected");
    } else {
      if (window.confirm("Are you sure you want to proceed?")) {
        setCheckout(true);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book {data.name.content} Now!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {checkout ? (
            <>
              <div className={Styles.roomTypeContainer}>
                <div className={Styles.roomType}>
                  <input
                    type="radio"
                    id="deluxe"
                    name="roomtype"
                    value="deluxe"
                  />
                  &nbsp;
                  <label for="deluxe" className={Styles.roomName}>
                    Deluxe Room
                  </label>
                  <p className={Styles.roomTypeDescription}>
                    1 Double Bed or 2 twin beds 260sqft
                  </p>
                  <p className={Styles.roomAmenities}>
                    Amenities : Air conditioning, WiFi, Geyser, Intercom, Room
                    Service, Housekeeping, Towels, Toiletries.
                  </p>
                  <span className={Styles.roomTypePrice}>
                    &#x20b9; {roomBasePrice}
                  </span>
                </div>
                <div className={Styles.roomType}>
                  <input
                    type="radio"
                    id="deluxe"
                    name="roomtype"
                    value="deluxe"
                  />
                  &nbsp;
                  <label for="deluxe" className={Styles.roomName}>
                    Twin Luxury Room
                  </label>
                  <p className={Styles.roomTypeDescription}>Twin Bed 300sqft</p>
                  <p className={Styles.roomAmenities}>
                    Amenities : Basic + Electric Kettle, Minibar, Safe.
                  </p>
                  <span className={Styles.roomTypePrice}>
                    &#x20b9; {roomBasePrice + 1100}
                  </span>
                </div>
                <div className={Styles.roomType}>
                  <input
                    type="radio"
                    id="luxuryking"
                    name="roomtype"
                    value="luxuryking"
                  />
                  &nbsp;
                  <label for="luxuryking" className={Styles.roomName}>
                    King Luxury Room
                  </label>
                  <p className={Styles.roomTypeDescription}>King bed 300sqft</p>
                  <p className={Styles.roomAmenities}>
                    Amenities : Basic + Electric Kettle, Minibar, Safe,
                    Iron/Ironing Board , In-room DVD Player, Hairdryer.
                  </p>
                  <span className={Styles.roomTypePrice}>
                    &#x20b9; {roomBasePrice + 1300}
                  </span>
                </div>
                <div className={Styles.roomType}>
                  <input
                    type="radio"
                    id="suite"
                    name="roomtype"
                    value="suite"
                  />
                  &nbsp;
                  <label for="suite" className={Styles.roomName}>
                    Premium Suite
                  </label>
                  <p className={Styles.roomTypeDescription}>
                    King Bed, extra spacious 400sqft
                  </p>
                  <p className={Styles.roomAmenities}>
                    Amenities : Basic + Electric Kettle, Minibar, Safe,
                    Iron/Ironing Board , In-room DVD Player, Hairdryer,
                    Slippers, Bathrobes, Newspaper.
                  </p>
                  <span className={Styles.roomTypePrice}>
                    &#x20b9; {roomBasePrice + 2000}
                  </span>
                </div>
                <p>
                  <strong>Note:</strong> All displayed prices are for one room
                  per night.
                </p>
              </div>
            </>
          ) : (
            <>
              <Carousel>
                {data.images.slice(0, 5).map((item) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`${image_baseURL}${item.path}`}
                      alt=""
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <br></br>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                View Description
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text" style={{ marginTop: "20px" }}>
                  {data.description.content}
                </div>
              </Collapse>
              <div className={Styles.inputsContainer}>
                <div className={Styles.guestsInput}>
                  <span>Guests </span>
                  <input
                    type="number"
                    defaultValue="0"
                    id="guestsInput"
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div className={Styles.roomsInput}>
                  <span>Rooms </span>
                  <input
                    type="number"
                    defaultValue="0"
                    id="roomsInput"
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div className={Styles.checkinDate}>
                  <span>Check-in </span>
                  <input type="date" min={today} id="checkinDate" required />
                </div>
                <div className={Styles.checkoutDate}>
                  <span>Check-out </span>
                  <input type="date" min={today} id="checkoutDate" required />
                </div>
              </div>
              <div className={Styles.contactContainer}>
                <p>
                  Call : {data.phones[0]?.phoneNumber},{" "}
                  {data.phones[1]?.phoneNumber}, {data.phones[2]?.phoneNumber}
                </p>
                <p>Email: {data.email?.toLowerCase() || "NA"}</p>
                <p>Website : {data.web?.toLowerCase() || "NA"} </p>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {checkout ? (
            <Button variant="primary">Proceed to Pay</Button>
          ) : (
            <Button variant="primary" onClick={() => handleCheckout()}>
              Select Room
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HotelModal;
