import { Modal, Button, Carousel, Collapse, Table } from "react-bootstrap";
import Styles from "./HotelModal.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../Auth";

const HotelModal = ({ data, show, setShow, searchedCity }) => {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [toPayment, setToPayment] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});
  let image_baseURL = "http://photos.hotelbeds.com/giata/bigger/";

  const handleClose = () => setShow(false);

  var room = {};
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

    const dateDiff =
      (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 3600 * 24);

    if (roomsInput <= 0 || guestsInput <= 0) {
      alert("Please enter the inputs correctly!");
    } else if (checkinDate === checkoutDate) {
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
        room.totalGuests = guestsInput;
        room.totalRooms = roomsInput;
        room.checkinDate = checkinDate;
        room.checkoutDate = checkoutDate;
        room.daysOfStay = dateDiff;
        setSelectedRoom(room);
        setCheckout(true);
      }
    }
  };

  const proceedToPay = () => {
    var roomTypesList = document.querySelectorAll("#roomtype");
    let roomType, roomPrice;
    for (let i = 0; i < roomTypesList.length; i++) {
      if (roomTypesList[i].checked) {
        roomType = roomTypesList[i].value;
        roomPrice = roomTypesList[i].getAttribute("data-room-price");
      }
    }
    setSelectedRoom({ ...selectedRoom, roomType, roomPrice });
    setCheckout(false);
    setToPayment(true);
  };

  const handleBooking = () => {
    let hotelName = data.name.content;
    let hotelCity = searchedCity;
    let firebaseURL = `https://kiitproject-1f1e2-default-rtdb.firebaseio.com/${currentUser.uid}/.json`;
    const totalPrice =
      parseInt(selectedRoom.roomPrice) *
        selectedRoom.totalRooms *
        selectedRoom.daysOfStay +
      249 +
      56.79;
    const phoneNumber = document.getElementById("phoneNumber").value;
    if (isNaN(phoneNumber) === true || phoneNumber === "") {
      alert("Please enter correct contact number!");
    } else {
      alert("Your Booking is Confirmed!");
      let finalData = {
        ...selectedRoom,
        phoneNumber,
        hotelName,
        totalPrice,
        hotelCity,
      };
      handleClose();
      fetch(firebaseURL, {
        method: "POST",
        body: JSON.stringify(finalData),
      });
    }
  };

  if (checkout) {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book {data.name.content} Now!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={Styles.roomTypeContainer}>
              <div className={Styles.roomType}>
                <input
                  type="radio"
                  id="roomtype"
                  name="roomtype"
                  value="Deluxe"
                  data-room-price={roomBasePrice}
                />
                &nbsp;
                <label htmlFor="Deluxe" className={Styles.roomName}>
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
                  id="roomtype"
                  name="roomtype"
                  value="Twin Deluxe"
                  data-room-price={roomBasePrice + 1100}
                />
                &nbsp;
                <label htmlFor="Twin Deluxe" className={Styles.roomName}>
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
                  id="roomtype"
                  name="roomtype"
                  value="Luxury King"
                  data-room-price={roomBasePrice + 1300}
                />
                &nbsp;
                <label htmlFor="King Luxury" className={Styles.roomName}>
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
                  id="roomtype"
                  name="roomtype"
                  value="Premium Suite"
                  data-room-price={roomBasePrice + 2000}
                />
                &nbsp;
                <label htmlFor="Premium Suite" className={Styles.roomName}>
                  Premium Suite
                </label>
                <p className={Styles.roomTypeDescription}>
                  King Bed, extra spacious 400sqft
                </p>
                <p className={Styles.roomAmenities}>
                  Amenities : Basic + Electric Kettle, Minibar, Safe,
                  Iron/Ironing Board , In-room DVD Player, Hairdryer, Slippers,
                  Bathrobes, Newspaper.
                </p>
                <span className={Styles.roomTypePrice}>
                  &#x20b9; {roomBasePrice + 2000}
                </span>
              </div>
              <p>
                <strong>Note:</strong> All displayed prices are for one room per
                night.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => proceedToPay()}>
              Proceed to Pay
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  if (toPayment) {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book {data.name.content} Now!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Price (in &#x20b9;)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {selectedRoom.roomType} x {selectedRoom.totalRooms} Rooms/
                    Day
                  </td>
                  <td>
                    {selectedRoom.roomPrice} x {selectedRoom.totalRooms}
                    <p style={{ margin: "5px 0 0 0" }}>
                      {selectedRoom.roomPrice * selectedRoom.totalRooms}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>For {selectedRoom.daysOfStay} Day(s)</td>
                  <td>
                    {selectedRoom.roomPrice *
                      selectedRoom.totalRooms *
                      selectedRoom.daysOfStay}
                  </td>
                </tr>
                <tr>
                  <td>Service Tax</td>
                  <td>249</td>
                </tr>
                <tr>
                  <td>Taxes</td>
                  <td>56.79</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    {parseInt(selectedRoom.roomPrice) *
                      selectedRoom.totalRooms *
                      selectedRoom.daysOfStay +
                      249 +
                      56.79}
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className={Styles.finalBookingValidationForm}>
              <p>
                <b>Primary Guest Details</b>
              </p>
              <p>Name : {currentUser.displayName}</p>
              <p>Email : {currentUser.email}</p>
              <label htmlFor="phoneNumber">Contact : &nbsp;</label>
              <input
                name="phoneNumber"
                placeholder="Enter Contact"
                required
                id="phoneNumber"
                className={Styles.phoneNumber}
              />
            </div>
            <div className={Styles.paymentTypeForm}>
              <input
                type="radio"
                id="paymentType"
                name="paymentType"
                value="Pay at Hotel"
              />
              &nbsp;
              <label htmlFor="Pay At Hotel">Pay at Hotel</label>
              &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                id="paymentType"
                name="paymentType"
                value="Pay Now"
              />
              &nbsp;
              <label htmlFor="Pat Now">Pay Now</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleBooking()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book {data.name.content} Now!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Carousel>
              {data.images.slice(0, 5).map((item, index) => (
                <Carousel.Item key={index}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCheckout()}>
            Select Room
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HotelModal;
