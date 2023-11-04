import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { StarFill, SuitHeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { asyncFetchUserPicks } from "../../store/restaurantSlice";

const UserPicksList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log("아이디 들어오나? : " + id);

  // Redux 스토어에서 사용자와 관련된 정보를 가져오기 위해 useSelector 사용
  const ResPicksList = useSelector((state) => state.restaurant.userPicks);
  console.log("ResPicksList:" + ResPicksList);

  useEffect(() => {
    console.log(id);
    dispatch(asyncFetchUserPicks(id));
  }, [dispatch, id]);

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "120px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {ResPicksList.length > 0 ? (
        ResPicksList.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.restaurant.resCode}`}
            key={restaurant?.restaurant.resCode}
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
        ))
      ) : (
        <div className="container">
          <div
            className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3"
            style={{ marginTop: "100px" }}
          >
            <span>사용자가 아직 식당을 찜하지 않았습니다.</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserPicksList;
