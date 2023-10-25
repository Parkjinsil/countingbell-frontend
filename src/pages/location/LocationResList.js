import React from "react";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../../assets/111.jpg";
import { findByLocalCode } from "../../api/restaurant";
import { asyncFindByLocalCode } from "../../store/restaurantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LocationResList = () => {
  const dispatch = useDispatch();
  const { localCode } = useParams();

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  useEffect(() => {
    console.log(localCode);
    dispatch(asyncFindByLocalCode(localCode));
  }, [dispatch, localCode]);

  console.log("restaurantList:", restaurantList); // 확인용 console.log 추가

  return (
    <Container
      style={{
        gap: "20px",
        paddingLeft: "15%",
        paddingTop: "120px",
        display: "flex",
      }}
    >
      {restaurantList.map((restaurant) => (
        <Card key={restaurant.resCode} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={image1} />
          <Card.Body>
            <Card.Text style={{ paddingBottom: "5px" }}>
              <span
                className="restaurant-name"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {restaurant.resName}
              </span>
              {/* <div>
                  <StarFill
                    className="bi bi-star-fill"
                    style={{
                      fontSize: "1.3rem",
                      color: "#fbe94b",
                      margin: "3px",
                    }}
                  />
                  <span style={{ fontSize: "1.3rem" }}>
                    평점{location.rating}
                  </span>
                </div> */}
              <span className="last-line" style={{ fontSize: "1.1rem" }}>
                {restaurant.foodType}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default LocationResList;
