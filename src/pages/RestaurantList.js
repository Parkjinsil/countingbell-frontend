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
  const [page, setPage] = useState(1);

  const restaurants = useSelector((state) => state.restaurant.restaurantList);

  // useEffect(() => {
  //   dispatch(asyncGetRestaurants(page));
  // }, [dispatch]);

  ///////// 무한스크롤 //////////////

  const [restaurant, setRestaurant] = useState([]);

  const hasScrollbar = () => {
    return document.documentElement.scrollHeight > window.innerHeight;
  };

  const [ref, inView] = useInView({
    skip: !hasScrollbar(), // 스크롤이 없을 경우 skip
  });

  const ResListAPI = async () => {
    const result = await dispatch(asyncGetRestaurants(page));
    const newRestaurants = result.payload; // API에서 가져온 새로운 데이터

    setRestaurant([...restaurants, ...newRestaurants]);
  };

  useEffect(() => {
    console.log("inView : " + inView);
    if (inView) {
      setPage(page + 1);
    }
    // else if (page > 1 && !inView) {
    //   setPage(page - 1);
    // }
  }, [inView]);

  useEffect(() => {
    ResListAPI();
  }, [page]); // page 상태가 변화될때마다

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "100px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {restaurants.map((restaurant) => (
        <Link to={`/restaurant/${restaurant.resCode}`} key={restaurant.resCode}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={"/upload/" + restaurant?.resPicture}
              style={{ height: "200px" }}
            />
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
                  {/* {restaurant.location.rating} */}
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
          <div ref={ref}></div>
        </Link>
      ))}
    </Container>
  );
};
export default RestaurantList;
