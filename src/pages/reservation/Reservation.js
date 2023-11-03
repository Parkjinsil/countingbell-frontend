import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import image11 from "../../assets/111.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncGetLocations } from "../../store/locationSlice";
import { asyncGetFoods } from "../../store/foodSlice";

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

const ReserveMain = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;
const ReserveMainType = styled.div`
  display: flex;
  flex-flow: column;
  height: 600px;
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
const ReserveCenterFooter = styled.div`
  button {
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
  button:visited {
    color: black;
  }
  button:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
  }
`;

const Reservation = () => {
  const image1 = image11;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const locations = useSelector((state) => state.location.locationList);
  const foods = useSelector((state) => state.food.foodList);

  useEffect(() => {
    dispatch(asyncGetLocations(1));
    dispatch(asyncGetFoods(1));
  }, [dispatch]);

  const [selectedLocalCode, setSelectedLocalCode] = useState(null);
  const [selectedFoodCode, setSelectedFoodCode] = useState(null);

  const takeValueclick1 = (food) => {
    const foodCode = food.foodCode;

    setSelectedFoodCode(foodCode);
  };

  const takeValueclick2 = (location) => {
    const localCode = location.localCode;

    setSelectedLocalCode(localCode);
  };

  const handleReservation = () => {
    const foodCode = selectedFoodCode;
    const localCode = selectedLocalCode;

    console.log("foodCode : " + foodCode, "localCode : " + localCode);
    if (foodCode && localCode) {
      navigate(`/reservationResList/${foodCode}/${localCode}`);
    } else {
      navigate("/reservation");
    }
  };

  return (
    <Wrap id="wrap">
      <Reserve id="reserve">
        <Container>
          <ReserveHeader className="reserve-header">
            <div>
              <img src={image1} alt="" />
              <span>식당예약</span>
            </div>
          </ReserveHeader>
          <div id="reserve-center">
            <ReserveMain className="reserve-main">
              <ReserveMainType className="reserve-main-type" id="food-type">
                <span>종류</span>
                {foods
                  .slice()
                  .reverse()
                  .map((food, index) => (
                    <button
                      key={food.foodCode}
                      onClick={() => takeValueclick1(food)}
                    >
                      {food.foodType}
                    </button>
                  ))}
              </ReserveMainType>
              <ReserveMainType className="reserve-main-type" id="location">
                <span>위치</span>
                {locations.map((location, index) => (
                  <button
                    key={location.localCode}
                    onClick={() => takeValueclick2(location)}
                  >
                    {location.localName}
                  </button>
                ))}
              </ReserveMainType>
            </ReserveMain>
            <ReserveCenterFooter className="reserve-center-footer">
              <button onClick={handleReservation}>예약하러 가기</button>
            </ReserveCenterFooter>
          </div>
        </Container>
      </Reserve>
    </Wrap>
  );
};

export default Reservation;
