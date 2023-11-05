import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getResByUserId } from "../../api/restaurant";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { asyncGetResByUserId } from "../../store/restaurantSlice";

const ResIdBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  console.log("아이디 들어오나? : " + id);

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  const onAddRes = () => {
    navigate(`/addRestaurant/${id}`);
  };

  useEffect(() => {
    console.log(id);
    dispatch(asyncGetResByUserId(id));
  }, [dispatch, id]);

  return (
    <Container
      style={{
        gap: "20px",
        paddingTop: "150px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {restaurantList.map((restaurant) => (
        <Link
          to={`/restaurant/${restaurant.resCode}`}
          key={restaurant?.resCode}
        >
          <Card style={{ width: "250px", height: "400px" }}>
            <Card.Img variant="top" src={"/upload/" + restaurant?.resPicture} />
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
                  {/* {location.rating} */}
                </span>
                <span
                  className="last-line"
                  style={{ fontSize: "1.1rem", display: "block" }}
                >
                  {restaurant.food.foodType}
                </span>
                <button
                  type="button"
                  className="btn text-black"
                  style={{
                    borderRadius: "50%",
                    border: "solid 1px #888",
                    backgroundColor: "transparent",
                    float: "right",
                    marginLeft: "5px",
                  }}
                  // onClick={onNavigate}
                >
                  삭제
                </button>
                <button
                  type="button"
                  className="btn text-black"
                  style={{
                    borderRadius: "50%",
                    border: "solid 1px #888",
                    backgroundColor: "transparent",
                    float: "right",
                  }}
                  // onClick={onNavigate}
                >
                  수정
                </button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
      <button
        type="button"
        className="btn text-black"
        style={{
          position: "absolute",
          top: "100px",
          right: "-60px",
          border: "solid 1px #888",
          backgroundColor: "transparent",
          width: "200 px",
          height: "50px",
          margin: "0 200px",
        }}
        onClick={onAddRes}
      >
        식당 등록
      </button>
    </Container>
  );
};
export default ResIdBoard;
