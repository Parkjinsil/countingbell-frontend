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
  const [restaurantList, setRestaurantList] = useState([]); // 검색된 식당 리스트 상태 추가

  const searchValue = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`API_ENDPOINT?q=${searchTerm}`); // 예시: API 호출
      const data = await response.json(); // API 응답을 JSON으로 파싱

      setRestaurantList(data.results); // 검색된 식당 리스트 업데이트
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="식당명 검색"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 시 상태 업데이트
              />
              <button
                class="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                검색
              </button>
            </div>
          </div>
        </form>

        <div
          class="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabindex="-1"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                  Modal 1
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Show a second modal and hide this one with the button below.
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-primary"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                >
                  Open second modal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabindex="-1"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel2">
                  Modal 2
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Hide this modal and show the first with the button below.
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-primary"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  Back to first
                </button>
              </div>
            </div>
          </div>
        </div>
        <a
          class="btn btn-primary"
          data-bs-toggle="modal"
          href="#exampleModalToggle"
          role="button"
        >
          Open first modal
        </a>

        <div className="resListContainer">
          <ul>
            <li>
              <a href="#">
                <div className="menu-img">
                  <img src={image3} alt="" style={{ width: "100px" }} />
                </div>
                <MenuBodyFooter className="menu-footer">
                  <span className="restaurant-name">
                    레스토랑스 강남점
                    <br />
                  </span>
                  <span>4.6</span>
                  <span>이탈리아 음식</span>
                  <span className="dot">강남</span>
                </MenuBodyFooter>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="menu-img">
                  <img src={image3} alt="" style={{ width: "100px" }} />
                </div>
                <MenuBodyFooter className="menu-footer">
                  <span className="restaurant-name">
                    레스토랑스 강남점
                    <br />
                  </span>

                  <span>4.6</span>
                  <span>이탈리아 음식</span>
                  <span className="dot">강남</span>
                </MenuBodyFooter>
              </a>
            </li>
          </ul>
          {/* <ul>
            {restaurantList.map((restaurant, index) => (
              <li key={index}>{restaurant.resName}</li> // 식당 리스트 렌더링
            ))}
          </ul> */}
        </div>
      </Main>
    </Container>
  );
};
export default Waiting;
