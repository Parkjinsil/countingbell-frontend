import React, { useState } from "react";
import styled from "styled-components";
import { getRestaurantByName } from "../api/restaurant";
import {} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import image3 from "../assets/333.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: #f8cdc1;
`;

const Main = styled.div`
  display: inline;
  padding: 10px;
  background-color: white;
  width: 600px;
  height: auto;

  div {
    padding: 10px;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const MenuBodyFooter = styled.div`
  margin: 0 20px;
  position: relative;

  .restaurant-name {
    font-weight: bold;
    margin-bottom: 1px;
  }
  img {
    position: absolute;
    top: 17px;
    left: 23px;
  }
  span:nth-of-type(2) {
    margin-left: 19px;
    font-weight: bold;
  }
  .dot {
    color: rgba(8, 8, 8, 0.5);
    font-weight: 800;
  }
  span:nth-of-type(3) {
    color: #686969;
  }
  .dot::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    background-color: #686969;
    margin: 9px 7px 0;
    border-radius: 50%;
    vertical-align: 5px;
  }
`;

const Waiting = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [restaurantList, setRestaurantList] = useState([
    {
      resCode: 1,
      resName: "식당1",
      resAddr: "식당1",
      resPhone: "22221",
      resOpenHour: "8:00",
      resClose: "18:00",
      resDesc: "주차공간 없음",
      location: {
        localCode: 1,
        localName: "서울",
      },
      food: {
        foodCode: 1,
        foodType: "한식",
      },
      member: {
        id: "user1",
        password:
          "$2a$10$mJcZEvAwyovolgFS.Vc.6ekD6eZRdALj3NNdG8JegeqVTXJbcq8ra",
        name: "user1",
        phone: "010-1111-1111",
        nickname: "user1",
        gender: "F         ",
        age: 20,
        email: "user1@naver.com",
        role: "고객",
      },
    },
    {
      resCode: 2,
      resName: "식당2",
      resAddr: "식당2",
      resPhone: "22221",
      resOpenHour: "8:00",
      resClose: "18:00",
      resDesc: "주차공간 없음",
      location: {
        localCode: 1,
        localName: "서울",
      },
      food: {
        foodCode: 1,
        foodType: "한식",
      },
      member: {
        id: "user1",
        password:
          "$2a$10$mJcZEvAwyovolgFS.Vc.6ekD6eZRdALj3NNdG8JegeqVTXJbcq8ra",
        name: "user1",
        phone: "010-1111-1111",
        nickname: "user1",
        gender: "F         ",
        age: 20,
        email: "user1@naver.com",
        role: "고객",
      },
    },
    {
      resCode: 3,
      resName: "식당3",
      resAddr: "식당3",
      resPhone: "22221",
      resOpenHour: "8:00",
      resClose: "18:00",
      resDesc: "주차공간 없음",
      location: {
        localCode: 1,
        localName: "서울",
      },
      food: {
        foodCode: 1,
        foodType: "한식",
      },
      member: {
        id: "user1",
        password:
          "$2a$10$mJcZEvAwyovolgFS.Vc.6ekD6eZRdALj3NNdG8JegeqVTXJbcq8ra",
        name: "user1",
        phone: "010-1111-1111",
        nickname: "user1",
        gender: "F         ",
        age: 20,
        email: "user1@naver.com",
        role: "고객",
      },
    },
  ]); // 검색된 식당 리스트 상태 추가

  const [filteredRestaurantList, setFilteredRestaurantList] = useState([
    ...restaurantList,
  ]);

  const searchValue = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newList = restaurantList.filter((item) =>
      item.resName.toLowerCase().includes(searchTerm)
    );
    console.log(newList);
    setFilteredRestaurantList(newList);
  };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`API_ENDPOINT?q=${searchTerm}`); // 예시: API 호출
  //     const data = await response.json(); // API 응답을 JSON으로 파싱

  //     setRestaurantList(data.results); // 검색된 식당 리스트 업데이트
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <Container>
      <Main>
        <form onSubmit={handleSearch}>
          <div className="title">
            <h1>온라인 줄서기</h1>
          </div>

          <div className="searchResName">
            <div>
              <h1></h1>
            </div>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="식당명 검색"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 시 상태 업데이트
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                검색
              </button>
            </div>
            <div className="resListContainer">
              <ul>
                {filteredRestaurantList.map((restaurant, index) => (
                  <li key={index}>{restaurant.resName}</li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </Main>
    </Container>
  );
};
export default Waiting;
