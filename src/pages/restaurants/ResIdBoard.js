import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResByUserId } from "../../api/restaurant";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { asyncGetResByUserId } from "../../store/restaurantSlice";

const ResIdBoard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log("아이디 들어오나? : " + id);

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  useEffect(() => {
    console.log(id);
    dispatch(asyncGetResByUserId(id));
  }, [dispatch, id]);

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
        <Link
          to={`/restaurant/${restaurant.resCode}`}
          key={restaurant?.resCode}
        >
          <Card style={{ width: "250px" }}>
            <Card.Img variant="top" src={"/upload/" + restaurant?.resPicture} />
            <Card.Body>
              <Card.Text>
                <span
                  className="restaurant-name"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    display: "block",
                  }}
                >
                  {restaurant.resName}
                </span>

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
                <span
                  className="last-line"
                  style={{ fontSize: "1.1rem", display: "block" }}
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
export default ResIdBoard;
