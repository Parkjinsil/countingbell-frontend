import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getResByUserId } from "../../api/restaurant";
import { Container, Card } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { asyncGetResByUserId, asyncUpdateRestaurant } from "../../store/restaurantSlice";
import { deleteRestaurant } from "../../api/restaurant";
import { useState } from "react"

const ResIdBoard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const restaurantList = useSelector(
    (state) => state.restaurant.restaurantList
  );

  const [resCode, setResCode] = useState("");
  const [resName, setResName] = useState("");
  const [resAddr, setResAddr] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resOpenHour, setResOpenHour] = useState("");
  const [resClose, setResClose] = useState("");
  const [resDesc, setResDesc] = useState("");
  const [localCode, setLocalCode] = useState("");
  const [foodCode, setFoodCode] = useState("");
  const [resPicks, setResPicks] = useState("");
  const [resPicture, setResPicture] = useState(null);

  // 식당 추가
  const onAddRes = () => {
    navigate(`/addRestaurant/${id}`);
  }

  useEffect(() => {
    dispatch(asyncGetResByUserId(id));
  }, [dispatch, id]);

  // 식당 수정
  const onUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("resCode", resCode);
    formData.append("resName", resName);
    formData.append("resAddr", resAddr);
    formData.append("resPhone", resPhone);
    formData.append("resOpenHour", resOpenHour);
    formData.append("resClose", resClose);
    formData.append("resDesc", resDesc);
    formData.append("localCode", localCode);
    formData.append("foodCode", foodCode);
    formData.append("id", id);
    formData.append("resPicks", resPicks);
    formData.append("resPicture", resPicture);

    // console.log(resCode);
    // console.log(resName);
    // console.log(resAddr);
    // console.log(resPhone);
    // console.log(resOpenHour);
    // console.log(resClose);
    // console.log();
    // console.log();
    // console.log();

    dispatch(asyncUpdateRestaurant(formData));
  };

  // 식당 삭제
  const onDelete = async (resCode) => {
    try {
      await deleteRestaurant(resCode);
      alert("식당을 삭제했습니다");
      window.location.reload();
    } catch (error) {
      alert(`식당 삭제에 실패했습니다. 에러: ${error.message}`)
    }
  }

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
        <div key={restaurant?.resCode}>
          <Link
            to={`/restaurant/${restaurant.resCode}`}
          >
            <Card style={{ width: "250px" }}>
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
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <div>
            <button
              type="button"
              className="btn"
              style={{
                width: "50%",
                fontSize: "1em",
                border: "solid 1px #FF6B01",
                color: "#FF6B01",
                backgroundColor: "transparent",
                float: "right",
              }}
              onClick={() => onDelete(restaurant.resCode)
              }

            >
              삭제
            </button>
            <button
              type="button"
              className="btn"
              style={{
                width: "50%",
                fontSize: "1em",
                border: "solid 1px #FF6B01",
                color: "#FF6B01",
                backgroundColor: "transparent",
                float: "left",
              }}
              data-bs-toggle="modal"
              data-bs-target={`#exampleModal${restaurant.resCode}`}
              data-bs-whatever="@mdo"
              onClick={() => {
                setResCode(restaurant.setResCode);
                setResName(restaurant.setResName);
                setResAddr(restaurant.setResAddr);
                setResPhone(restaurant.setResPhone);
                setResOpenHour(restaurant.setResOpenHour);
                setResClose(restaurant.setResClose);
                setResDesc(restaurant.setResDesc);
                setLocalCode(restaurant.setLocalCode);
                setFoodCode(restaurant.setFoodCode);
                setResPicks(restaurant.setResPicks);
                setResPicture(restaurant.setResPicture);
              }}
            >
              수정
            </button>
            <div
              className="modal fade"
              id={`exampleModal${restaurant.resCode}`}
              tabIndex="-1"
              aria-labelledby={`exampleModalLabel${restaurant.resCode}`}
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      식당 수정하기
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body">
                    <form>
                      <div className="mb-3" hidden>
                        <label
                          htmlFor="resCode"
                          className="col-form-label"
                        >
                          식당코드 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="resCode"
                          value={restaurant.resCode}
                          onChange={(e) => {
                            setResCode(e.target.value);
                          }}
                          readOnly
                        />
                      </div>
                      <div className="mb-3" hidden>
                        <label
                          htmlFor="id"
                          className="col-form-label"
                        >
                          아이디 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="id"
                          value={restaurant.member.id}
                          onChange={(e) => {
                            // setId(e.target.value);
                          }}
                          readOnly
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="resName"
                          className="col-form-label"
                        >
                          식당이름 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="resName"
                          value={resName}
                          onChange={(e) => {
                            setResName(e.target.value);
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="resAddr"
                          className="col-form-label"
                        >
                          식당 주소 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="resAddr"
                          value={resAddr}
                          onChange={(e) => {
                            setResAddr(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="resPhone"
                          className="col-form-label"
                        >
                          식당 번호 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="resPhone"
                          value={resPhone}
                          onChange={(e) => {
                            setResPhone(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="resOpenHour"
                          className="col-form-label"
                        >
                          식당 오픈 시간 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="resOpenHour"
                          value={resOpenHour}
                          onChange={(e) => {
                            setResOpenHour(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="resClose"
                          className="col-form-label"
                        >
                          식당 마감 시간 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="resClose"
                          value={resClose}
                          onChange={(e) => {
                            setResClose(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="resDesc"
                          className="col-form-label"
                        >
                          식당 설명 :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="resDesc"
                          value={resDesc}
                          onChange={(e) => {
                            setResDesc(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="resPicture"
                          className="col-form-label"
                        >
                          식당 사진 :
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="resPicture"
                          onChange={(e) => {
                            setResPicture(e.target.files[0]);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={onUpdate}
                      value={restaurant}
                    >
                      확인
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn"
        style={{
          position: "absolute",
          border: "solid 1px #FF6B01",
          color: "#FF6B01",
          backgroundColor: "transparent",
          float: "left",
          top: "100px",
          right: "-60px",
          width: "200 px",
          height: "50px",
          margin: "0 200px"
        }}
        onClick={onAddRes}
      >
        식당 등록
      </button>
    </Container>
  );
};
export default ResIdBoard;
