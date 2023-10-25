import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncGetFoods } from "../../store/foodSlice";
import { useState } from "react";

const FoodTypeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const foods = useSelector((state) => state.food.foodList);

  useEffect(() => {
    dispatch(asyncGetFoods(1));
  }, [dispatch]);

  const [selectedResCode, setSelectedResCode] = useState(null);

  // foodCode를 클릭 시 이동
  const takeValueclick = (food) => {
    const foodCode = food.foodCode;
    setSelectedResCode(foodCode);
    navigate(`/foodResList/${foodCode}`);
  };

  return (
    <div
      className="container my-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="position-relative p-5  bg-body border border-dashed rounded-5">
        <Container>
          <div
            className="d-flex flex-wrap"
            style={{ gap: "50px", margin: "0 170px" }}
          >
            {foods
              .slice()
              .reverse()
              .map((food, index) => (
                <button
                  className="btn  btn-outline-warning m-2"
                  key={food.foodCode}
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    minWidth: "150px",
                    minHeight: "90px",
                  }}
                  onClick={() => takeValueclick(food)}
                >
                  {food.foodType}
                </button>
              ))}
          </div>
        </Container>
      </div>
    </div>
  );
};
export default FoodTypeList;
