import { Modal, Button, Carousel, Collapse } from "react-bootstrap";
import Styles from "./HotelModal.module.css";
import { useState } from "react";

const HotelModal = ({ data, show, setShow }) => {
  const handleClose = () => setShow(false);
  const [open, setOpen] = useState(false);
  let image_baseURL = "http://photos.hotelbeds.com/giata/bigger/";

  const checkout = () => {
    // const guestsInput = document.querySelector("#guestsInput").value;
    // const roomsInput = document.querySelector("#roomsInput").value;
    const checkinDate = document.querySelector("#checkinDate").value;
    const checkoutDate = document.querySelector("#checkoutDate").value;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    if (checkinDate > checkoutDate) {
      alert("Checkout Date cannot be before Checkin Date");
    } else if (checkinDate < today) {
      alert("Checkin Date cannot be before Today");
    } else if (checkinDate === checkoutDate) {
      alert("Checkin and Checkout cannot be same day!");
    }

    // if (roomsInput >= Math.ceil(guestsInput / 2) && roomsInput <= guestsInput) {
    // } else {
    //   alert("Insufficient Rooms Selected");
    // }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book {data.name.content} Now!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Body>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            View Description
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">{data.description.content}</div>
          </Collapse>
        </Modal.Body>
        <Modal.Body>
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
              <input type="date" id="checkinDate" required />
            </div>
            <div className={Styles.checkoutDate}>
              <span>Check-out </span>
              <input type="date" id="checkoutDate" required />
            </div>
          </div>
        </Modal.Body>
        <Modal.Body>
          <div className={Styles.contactContainer}>
            <p>
              Call :{" "}
              {data.phones[0]?.phoneNumber || data.phones[1]?.phoneNumber}
            </p>
            <p>Email: {data.email?.toLowerCase()}</p>
            <p>Website : {data.web?.toLowerCase()} </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => checkout()}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HotelModal;
