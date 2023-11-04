import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { StarFill, SuitHeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { asyncViewTotalPick } from "../../store/pickSilce";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const ResPicksList = () => {
  const dispatch = useDispatch();
  //const [page, setPage] = useState(1);

  const resPicksList = useSelector((state) => state.pick.resPicksList);

  useEffect(() => {
    dispatch(asyncViewTotalPick(1));
  }, [dispatch]);

  // const hasScrollbar = () => {
  //   return document.documentElement.scrollHeight > window.innerHeight;
  // };

  // const [ref, inView] = useInView({
  //   skip: !hasScrollbar(), // 스크롤이 없을 경우 skip
  // });

  // const PicksListAPI = () => {
  //   dispatch(asyncViewTotalPick(page));
  // };

  //resPicks 수가 많은 순으로 정렬
  const sortedResPicksList = [...resPicksList].sort(
    (a, b) => b.restaurant.resPicks - a.restaurant.resPicks
  );

  // useEffect(() => {
  //   console.log("inView : " + inView);
  //   if (inView) {
  //     setPage(page + 1);
  //   }
  // }, [inView]);

  // useEffect(() => {
  //   PicksListAPI();
  // }, [page]); // page 상태가 변화될때마다

  //중복된 식당을 제거하기 위한 Set 생성
  const uniqueResSet = new Set();
  const uniqueResPicksList = sortedResPicksList.filter((restaurant) => {
    if (!uniqueResSet.has(restaurant.restaurant.resCode)) {
      uniqueResSet.add(restaurant.restaurant.resCode);
      return true;
    }
    return false;
  });

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "120px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {uniqueResPicksList.map((restaurant, index) => (
        <Link
          to={`/restaurant/${restaurant.restaurant.resCode}`}
          key={index}
          // ref={ref}
        >
          <Card
            style={{
              width: "300px",
              height: "450px",
            }}
          >
            <Card.Img
              variant="top"
              src={"/upload/" + restaurant?.restaurant?.resPicture}
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
                  {restaurant.restaurant.resName}
                </span>
                <span
                  className="last-line"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                    margin: "1px 0px 0px 0px",
                  }}
                >
                  {restaurant.restaurant.food.foodType}
                </span>
                <span
                  className="restaurant-addr"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                    margin: "7px 0px 4px 0px",
                  }}
                >
                  주소 : {restaurant.restaurant.resAddr}
                </span>
                <span
                  className="restaurant-time"
                  style={{
                    fontSize: "1.1rem",
                    display: "block",
                  }}
                >
                  영업시간 : {restaurant.restaurant.resOpenHour} -{" "}
                  {restaurant.restaurant.resClose}
                </span>

                <span style={{ paddingLeft: "230px" }}>
                  <SuitHeartFill
                    className="bi bi-suit-heart fs-5"
                    style={{ color: "red" }}
                  />{" "}
                  {restaurant.restaurant.resPicks}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
      {/* <div ref={ref}></div> */}
    </Container>
  );
};
export default ResPicksList;
