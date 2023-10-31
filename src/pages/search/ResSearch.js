import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSearchResByMenuName } from "../../store/restaurantSlice";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";

const ResSearch = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { keyword } = useParams();

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  useEffect(() => {
    console.log("keyword값 들어왔나? : " + keyword);
    dispatch(asyncSearchResByMenuName(keyword));
  }, [dispatch, keyword]);

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
          to={`/restaurant/${restaurant.restaurant.resCode}`}
          key={restaurant.restaurant.resCode}
        >
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={"/upload/" + restaurant?.restaurant.resPicture}
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
                  {restaurant.restaurant.resName}
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
                  {/* {restaurant.restaurant.location.rating} */}
                </span>
                <span
                  className="last-line"
                  style={{ fontSize: "1.1rem", display: "block" }}
                >
                  {restaurant.restaurant.food.foodType}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};
export default ResSearch;
