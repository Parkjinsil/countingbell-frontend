import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { StarFill, SuitHeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { asyncViewDiscounts } from "../../store/discountSlice";

const DiscountBoard = () => {
  const dispatch = useDispatch();

  // Redux 스토어에서 사용자와 관련된 정보를 가져오기 위해 useSelector 사용
  const discountsList = useSelector((state) => state.discount.discountsList);
  console.log("DiscountsList:" + discountsList);

  useEffect(() => {
    //   console.log(id);
    dispatch(asyncViewDiscounts(1));
  }, [dispatch]);

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "120px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {discountsList.map((discount) => (
        <Link
          to={`/restaurant/${discount.restaurant.resCode}`}
          key={discount.restaurant.resCode}
        >
          <Card style={{ width: "300px", height: "450px" }}>
            <Card.Img
              variant="top"
              src={"/upload/" + discount.restaurant.resPicture}
              style={{ height: "60%" }}
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
                  {discount.restaurant.resName}
                </span>

                <span
                  style={{
                    fontSize: "1.3rem",
                    display: "block",
                    paddingTop: "3px",
                  }}
                >
                  <StarFill
                    className="bi bi-star-fill"
                    style={{
                      fontSize: "1.3rem",
                      color: "#fbe94b",
                      margin: "3px",
                    }}
                  />
                  평점
                </span>

                <span
                  className="discount-info"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                    margin: "3px",
                  }}
                >
                  할인 설명: {discount.disDesc}
                </span>

                <span
                  className="discount-info"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                    margin: "3px",
                  }}
                >
                  할인 기간: {discount.disPeriod}
                </span>

                <span
                  className="last-line"
                  style={{ fontSize: "1.1rem", display: "block" }}
                >
                  {discount.restaurant.food.foodType}
                </span>
                <span style={{ paddingLeft: "180px" }}>
                  <SuitHeartFill
                    className="bi bi-suit-heart fs-5"
                    style={{ color: "red" }}
                  />{" "}
                  {discount.restaurant.resPicks}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default DiscountBoard;
