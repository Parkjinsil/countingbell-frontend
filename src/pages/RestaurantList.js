import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { asyncGetRestaurants } from "../store/restaurantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { getRestaurants } from "../api/restaurant";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState("");
  const [page, setPage] = useState(1);

  const restaurants = useSelector((state) => state.restaurant.restaurantList);

  useEffect(() => {
    dispatch(asyncGetRestaurants(page));
  }, [dispatch]);

  // 스크롤
  console.log(
    "얼마나 내렸는 지 : " + window.scrollY,
    "화면 보이는 길이 : " + window.innerHeight,
    "총 길이 : " + document.documentElement.scrollHeight
  );

  const hasScrollbar = () => {
    return document.documentElement.scrollHeight > window.innerHeight;
  };

  const [ref, inView] = useInView({
    skip: !hasScrollbar(), // 스크롤이 없을 경우 skip
  });

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "120px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {restaurants.map((restaurant) => (
        <Link to={`/restaurant/${restaurant.resCode}`} key={restaurant.resCode}>
          <Card style={{ width: "18rem" }}>
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
                <span
                  className="restaurant-addr"
                  style={{
                    fontSize: "1.2rem",
                    display: "block",
                  }}
                >
                  {restaurant.resAddr}
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
                  {/* {restaurants.rating} */}
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
export default RestaurantList;
