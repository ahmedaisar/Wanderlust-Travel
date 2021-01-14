// import { useEffect } from "react";
import Styles from "./Hotel.module.css";

const Hotel = ({ data, id }) => {
  let image_baseURL = "http://photos.hotelbeds.com/giata/medium/";

  return (
    <>
      <li key={id} className={Styles.container}>
        <p className={Styles.hotelName}>{data.name.content}</p>
        {data.images?.slice(0, 10).map((item) => (
          <img src={image_baseURL + item.path} alt={data.name.content} />
        ))}
      </li>
    </>
  );
};

export default Hotel;
