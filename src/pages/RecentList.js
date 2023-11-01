import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image1 from "../assets/111.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

const Board = styled.div`
  display: inline-block;
  background-color: azure;
  padding: 120px;
  width: 100vw;
  height: 100vh;
`;

const Top = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const HorizontalLine = styled.div`
  border-bottom: 2px solid #000; /* 선의 높이와 색상을 조절*/
  border-color: #ff5e33;
  margin: 10px;
`;

const RecentList = () => {
  const restaurants = JSON.parse(localStorage.getItem("watch")) || []; //  <-- 배열 가지고 옴
  console.log(restaurants);

  return (
    <Board>
      <Top>
        <div>
          <h1>최근 본 상품</h1>
        </div>
        <HorizontalLine></HorizontalLine>
      </Top>

      <Container
        style={{
          gap: "20px",
          // paddingTop: "100px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {restaurants.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.resCode}`}
            key={restaurant.resCode}
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
      </Container>
    </Board>
  );
};
export default RecentList;
