import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { asyncViewTotalPick } from "../../store/pickSilce";
import { useNavigate } from "react-router-dom";

const ResPicksList = () => {
  const dispatch = useDispatch();
  const { pickCode } = useParams();
  const navigate = useNavigate();

  const resPicksList = useSelector((state) => state.pick.resPicksList);

  useEffect(() => {
    dispatch(asyncViewTotalPick(1));
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
      {resPicksList.map((restaurant) => (
        <Link
          to={`/restaurant/${restaurant.restaurant.resCode}`}
          key={restaurant?.restaurant.resCode}
        >
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={"/upload/" + restaurant?.restaurant?.resPicture}
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
                  {restaurant.restaurant.food.foodType}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};
export default ResPicksList;
