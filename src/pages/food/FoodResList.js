import React from "react";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  asyncFindByFoodCode,
  asyncGetRestaurants,
} from "../../store/restaurantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const FoodResList = () => {
  const dispatch = useDispatch();
  const { foodCode } = useParams();
  const [page, setPage] = useState(1);

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  useEffect(() => {
    console.log(foodCode);
    dispatch(asyncFindByFoodCode(foodCode));
  }, [dispatch, foodCode]);

  const hasScrollbar = () => {
    return document.documentElement.scrollHeight > window.innerHeight;
  };

  const [ref, inView] = useInView({
    skip: !hasScrollbar(), // 스크롤이 없을 경우 skip
  });

  // const ResListAPI = () => {
  //   dispatch(asyncGetRestaurants(page));
  // };

  useEffect(() => {
    console.log("inView : " + inView);
    if (inView) {
      setPage(page + 1);
    }
  }, [inView]);

  console.log("restaurantList:", restaurantList); // 확인용 console.log 추가

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "100px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {restaurantList.map((restaurant) => (
        <Link
          to={`/restaurant/${restaurant.resCode}`}
          key={restaurant.resCode}
          ref={ref}
        >
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
        </Link>
      ))}
      <div ref={ref}></div>
    </Container>
  );
};

export default FoodResList;
