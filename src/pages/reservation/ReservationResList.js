import React from "react";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { asyncFindResByFilter } from "../../store/restaurantSlice";

const ReservationResList = () => {
  const dispatch = useDispatch();
  const { foodCode, localCode } = useParams();

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  useEffect(() => {
    dispatch(asyncFindResByFilter({ foodCode, localCode }));
  }, [dispatch, { foodCode, localCode }]);

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "120px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {restaurantList.map((restaurant) => (
        <Link to={`/restaurant/${restaurant.resCode}`} key={restaurant.resCode}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={"/upload/" + restaurant?.resPicture} />
            <Card.Body>
              <Card.Text style={{}}>
                <span
                  className="restaurant-name"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    display: "block",
                    paddingBottom: "5px",
                  }}
                >
                  {restaurant.resName}
                </span>
                <span
                  className="restaurant-addr"
                  style={{
                    fontSize: "1rem",
                    display: "block",
                    paddingBottom: "5px",
                  }}
                >
                  {restaurant.resAddr}
                </span>
                <StarFill
                  className="bi bi-star-fill"
                  style={{
                    fontSize: "1.3rem",
                    color: "#FBE94B",
                    margin: "3px",
                  }}
                />

                <span
                  className="last-line"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                    paddingBottom: "5px",
                  }}
                >
                  {restaurant.food.foodType}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default ReservationResList;
