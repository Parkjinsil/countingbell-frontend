import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import { asyncSearchResByResName } from "../../store/restaurantSlice";

const SearchByResName = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  useEffect(() => {
    console.log("keyword값 들어왔나? : " + keyword);
    dispatch(asyncSearchResByResName(keyword));
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
          to={`/restaurant/${restaurant.resCode}`}
          key={restaurant?.resCode}
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
                  {restaurant?.resName}
                </span>

                <span
                  className="last-line"
                  style={{ fontSize: "1.1rem", display: "block", paddingTop:"10px" }}
                >
                  {restaurant?.food?.foodType}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};
export default SearchByResName;
