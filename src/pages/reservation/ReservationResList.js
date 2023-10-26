import React from "react";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../../assets/111.jpg";
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
    dispatch(asyncFindResByFilter({foodCode, localCode}));
  }, [dispatch, {foodCode,localCode}]);

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
        <Link to={`/restaurant/${restaurant.resCode}`}>
          <Card key={restaurant.resCode} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={image1}
              // src={restaurant.resPhoto} // 식당테이블에 사진추가해야함
            />
            <Card.Body>
              <Card.Text style={{}}>
                <div>
                  <span
                    className="restaurant-name"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {restaurant.resName}
                  </span>
                </div>

                <div>
                  <StarFill
                    className="bi bi-star-fill"
                    style={{
                      fontSize: "1.3rem",
                      color: "#fbe94b",
                      margin: "3px",
                    }}
                  />
                  <span style={{ fontSize: "1.3rem" }}>
                    평점
                    {/* {location.rating} */}
                  </span>
                </div>
                <div>
                  <span className="last-line" style={{ fontSize: "1.1rem" }}>
                    {restaurant.food.foodType}
                  </span>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default ReservationResList;
