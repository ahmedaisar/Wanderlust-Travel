import Styles from "./HotelCard.module.css";
import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import HotelModal from "../HotelModal/HotelModal";

const HotelCard = ({ data, id, searchedCity }) => {
  let image_baseURL = "http://photos.hotelbeds.com/giata/medium/";

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className={Styles.card} key={id}>
        <Card.Header as="h4" key={id}>
          <span>{data.name.content}</span>
        </Card.Header>
        <Card.Body className={Styles.cardBody} key={id}>
          <Card.Title>
            <img
              src={`${image_baseURL}${data.images[0].path}`}
              alt={data.name.content}
            />
          </Card.Title>
          <div className={Styles.cardText} key={id}>
            <Card.Text>{data.address.content}</Card.Text>
            <Card.Text>
              Contact : <b>{data.phones[0].phoneNumber}</b>
            </Card.Text>
          </div>
          <Button
            variant="primary"
            className={Styles.bookBtn}
            onClick={handleShow}
          >
            View
          </Button>
        </Card.Body>
      </Card>
      {show ? (
        <HotelModal
          data={data}
          searchedCity={searchedCity}
          show={show}
          key={id}
          setShow={setShow}
        />
      ) : null}
    </>
  );
};

export default HotelCard;
