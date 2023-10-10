import React, { userState } from "react";
import styled from "styled-components";

import image11 from "../assets/111.png";

const Wrap = styled.div`
  text-align: center;
`;

const Reserve = styled.div`
  display: inline-block;
  width: 1270px;
`;

const ReserveHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.5px solid #ffac95;
  margin-bottom: 10px;

  img {
    width: 80px;
    height: 75px;
    margin: 0 20px;
  }
  div {
    height: 65px;
    color: #ff5e33;
    font-size: 22px;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ReserveCenterHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;

  button {
    width: 82px;
    position: relative;
    display: flex;
    margin: 0 20px;
    padding: 7px;
    border-radius: 10px;
    background-color: transparent;
    background-color: #ffede9;
    border: 1px solid white;
    margin-top: 20px;
    font-size: 20px;
    justify-content: center;
  }
  button:hover {
    border: 1px solid #ff5e33;
  }
  button:focus {
    filter: brightness(0.9);
  }
  button span:first-child {
    position: absolute;
    top: 7px;
    left: 14px;
  }
  .dot {
    margin-left: 21px;
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
const ReserveMain = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;
const ReserveMainType = styled.div`
  display: flex;
  flex-flow: column;
  height: 900px;
  border: 2px solid #ff5e33;
  border-radius: 10px;
  margin: 20px;
  width: 236px;

  span {
    margin: 20px;
    color: #ff5e33;
    font-size: 25px;
    font-weight: bold;
  }
  button {
    margin: 10px 20px;
    padding: 10px 0;
    background-color: #ffede9;
    border: 1px solid white;
    border-radius: 10px;
    font-size: 15px;
  }
  button:hover {
    cursor: pointer;
    border: 1px solid #ff5e33;
  }
  button:focus {
    filter: brightness(0.9);
  }
`;
const ReserveGrid = styled.div`
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-flow: column;
  grid-template-rows: repeat(11, 1fr);
  grid-template-columns: 1fr 1fr;

  button {
    margin: 0 5px;
    padding: 16px 9px;
  }
`;
const ReserveCenterFooter = styled.div`
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    text-decoration: none;
    border: 2px solid #ff5e33;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  a:visited {
    color: black;
  }
  a:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
  }
`;

const Reservation = () => {
  const image1 = image11;

  return (
    <Wrap id="wrap">
      <Reserve id="reserve">
        <ReserveHeader class="reserve-header">
          <div>
            <img src={image1} alt="" />
            <span>식당예약</span>
          </div>
        </ReserveHeader>
        <div id="reserve-center">
          <ReserveCenterHeader class="reserve-center-header">
            <button>
              <span>4</span>
              <span class="dot">수</span>
            </button>
            <button>
              <span>5</span>
              <span class="dot">목</span>
            </button>
            <button>
              <span>6</span>
              <span class="dot">금</span>
            </button>
            <button>
              <span>7</span>
              <span class="dot">토</span>
            </button>
            <button>
              <span>8</span>
              <span class="dot">일</span>
            </button>
            <button>
              <span>9</span>
              <span class="dot">월</span>
            </button>
            <button>
              <span>10</span>
              <span class="dot">화</span>
            </button>
          </ReserveCenterHeader>
          <ReserveMain class="reserve-main">
            <ReserveMainType class="reserve-main-type" id="food-type">
              <span>종류</span>
              <button>전체</button>
              <button>한식</button>
              <button>일식</button>
              <button>중식</button>
              <button>양식</button>
            </ReserveMainType>
            <ReserveMainType class="reserve-main-type" id="location">
              <span>지역</span>
              <button>압구정/청담</button>
              <button>이태원/한남</button>
              <button>부산</button>
              <button>성수</button>
              <button>광화문/종로</button>
              <button>강남/역삼</button>
              <button>합정/망원</button>
              <button>홍대/신촌</button>
              <button>여의도</button>
              <button>북촌/삼청</button>
              <button>을지로</button>
              <button>제주</button>
              <button>대구</button>
            </ReserveMainType>
            <ReserveMainType class="reserve-main-type" id="time">
              <span>시간</span>
              <ReserveGrid class="reserve-grid">
                <button>10:00</button>
                <button>10:30</button>
                <button>11:00</button>
                <button>11:30</button>
                <button>12:00</button>
                <button>12:30</button>
                <button>1:00</button>
                <button>1:30</button>
                <button>2:00</button>
                <button>2:30</button>
                <button>3:00</button>
                <button>3:30</button>
                <button>4:00</button>
                <button>5:00</button>
                <button>5:30</button>
                <button>6:00</button>
                <button>6:30</button>
                <button>7:00</button>
                <button>7:30</button>
                <button>8:00</button>
                <button>8:30</button>
                <button>9:00</button>
              </ReserveGrid>
            </ReserveMainType>
          </ReserveMain>
          <ReserveCenterFooter class="reserve-center-footer">
            <a href="#">예약하러 가기</a>
          </ReserveCenterFooter>
        </div>
      </Reserve>
    </Wrap>
  );
};

export default Reservation;
