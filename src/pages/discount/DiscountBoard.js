import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card } from "react-bootstrap";
import { SuitHeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { asyncViewDiscounts } from "../../store/discountSlice";
import { useInView } from "react-intersection-observer";

const DiscountBoard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  // Redux 스토어에서 사용자와 관련된 정보를 가져오기 위해 useSelector 사용
  const discountsList = useSelector((state) => state.discount.discountsList);
  console.log("DiscountsList:" + discountsList);

  const hasScrollbar = () => {
    return document.documentElement.scrollHeight > window.innerHeight;
  };

  const [ref, inView] = useInView({
    skip: !hasScrollbar(), // 스크롤이 없을 경우 skip
  });

  const DiscountsListAPI = () => {
    dispatch(asyncViewDiscounts(page));
  };

  useEffect(() => {
    console.log("inView : " + inView);
    if (inView) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    DiscountsListAPI();
  }, [page]); // page 상태가 변화될때마다

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
          ref={ref}
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
                  className="discount-info"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                    margin: "10px 0px 5px 0px",
                  }}
                >
                  할인 설명: {discount.disDesc}
                </span>

                <span
                  className="discount-info"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                    margin: "5px 0px 10px 0px",
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
                <span style={{ paddingLeft: "230px" }}>
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
      <div ref={ref}></div>
    </Container>
  );
};

export default DiscountBoard;
