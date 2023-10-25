import React from "react";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../../assets/111.jpg";
import { findByLocalCode } from "../../api/location";
import { asyncFindByLocalCode } from "../../store/locationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LocationResList = () => {
  const dispatch = useDispatch();
  const { selectedLocalCode } = useParams();

  const locations = useSelector((state) => state.location.locationList);

  useEffect(() => {
    console.log(selectedLocalCode);
    dispatch(asyncFindByLocalCode({ localCode: selectedLocalCode }));
  }, [dispatch, selectedLocalCode]);

  return (
    <Container
      style={{
        gap: "20px",
        paddingLeft: "15%",
        paddingTop: "120px",
        display: "flex",
      }}
    >
      {locations
        .filter(
          (location) =>
            !selectedLocalCode || location.localCode === selectedLocalCode
        )
        .map((location) => (
          <Card key={location.resCode} style={{ width: "18rem" }}>
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
                  {location.resName}
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
                {/* <span className="last-line" style={{ fontSize: "1.1rem" }}>
                  {location.foodType}
                </span> */}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default LocationResList;
