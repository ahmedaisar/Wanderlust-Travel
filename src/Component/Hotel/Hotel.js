import Styles from "./Hotel.module.css";
import { Card, Button } from "react-bootstrap";

const Hotel = ({ data, id }) => {
  let image_baseURL = "http://photos.hotelbeds.com/giata/medium/";
  return (
    <>
      <Card className={Styles.card}>
        <Card.Header as="h4">
          <span>{data.name.content}</span>
        </Card.Header>
        <Card.Body className={Styles.cardBody}>
          <Card.Title>
            <img
              src={`${image_baseURL}${data.images[0].path}`}
              alt={data.name.content}
            />
          </Card.Title>
          <div className={Styles.cardText}>
            <Card.Text>{data.address.content}</Card.Text>
            <Card.Text>
              Contact : <b>{data.phones[0].phoneNumber}</b>
            </Card.Text>
          </div>
          <Button variant="primary">Book Now!</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Hotel;
