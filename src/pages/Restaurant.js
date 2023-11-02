import React, { useEffect, useState } from "react";
import { } from "react-bootstrap";
import { StarFill, SuitHeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { asyncFindByDisCode } from "../store/discountSlice";
import { pickAddorDelete } from "../api/restaurant";

import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncFindByMenuCode, asyncGetMenus } from "../store/menuSlice";
import {
  asyncDeletePick,
  asyncUpdatePick,
  asyncFetchUserPicks,
} from "../store/restaurantSlice";
import { asyncGetRestaurant } from "../store/restaurantSlice";

import { asyncFindReviewByResCode } from "../store/reviewSlice";
import { userSave } from "../store/userSlice";

const StyleNav = styled.div`
  .nav-pills > .nav-item.active > .nav-link {
    background-color: #fcac6b !important;
  }
`;

const StyleReview = styled.section`
  body {
    background-color: #f8f9fa !important;
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  .mb-0,
  .my-0 {
    margin-bottom: 0 !important;
  }
  .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }
  user-dashboard-info-box .user-dashboard-info-box .candidates-list .thumb {
    margin-right: 20px;
  }
  .user-dashboard-info-box .candidates-list .thumb img {
    width: 80px;
    height: 80px;
    -o-object-fit: cover;
    object-fit: cover;
    overflow: hidden;
    border-radius: 50%;
  }

  .user-dashboard-info-box .title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 30px 0;
  }

  .user-dashboard-info-box .candidates-list td {
    vertical-align: middle;
  }

  .user-dashboard-info-box td li {
    margin: 0 4px;
  }

  .user-dashboard-info-box .table thead th {
    border-bottom: none;
  }

  .table.manage-candidates-top th {
    border: 0;
  }

  .user-dashboard-info-box
    .candidate-list-favourite-time
    .candidate-list-favourite {
    margin-bottom: 10px;
  }

  .table.manage-candidates-top {
    min-width: 650px;
  }

  .user-dashboard-info-box .candidate-list-details ul {
    color: #969696;
  }

  /* Candidate List */
  .candidate-list {
    background: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 20px;
  }
  .candidate-list:hover {
    -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    position: relative;
    z-index: 99;
  }
  .candidate-list:hover a.candidate-list-favourite {
    color: #e74c3c;
    -webkit-box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);
    box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);
  }

  .candidate-list .candidate-list-image {
    margin-right: 25px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 80px;
    flex: 0 0 80px;
    border: none;
  }
  .candidate-list .candidate-list-image img {
    width: 80px;
    height: 80px;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .candidate-list-title {
    margin-bottom: 5px;
  }

  .candidate-list-details ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 0px;
  }
  .candidate-list-details ul li {
    margin: 5px 10px 15px 50px;
    font-size: 13px;
  }

  .candidate-list .candidate-list-favourite-time {
    margin-left: auto;
    text-align: center;
    font-size: 13px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 90px;
    flex: 0 0 90px;
  }
  .candidate-list .candidate-list-favourite-time span {
    display: block;
    margin: 0 auto;
  }
  .candidate-list .candidate-list-favourite-time .candidate-list-favourite {
    display: inline-block;
    position: relative;
    height: 40px;
    width: 40px;
    line-height: 40px;
    border: 1px solid #eeeeee;
    border-radius: 100%;
    text-align: center;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    margin-bottom: 20px;
    font-size: 16px;
    color: #646f79;
  }
  .candidate-list
    .candidate-list-favourite-time
    .candidate-list-favourite:hover {
    background: #ffffff;
    color: #e74c3c;
  }

  .candidate-banner .candidate-list:hover {
    position: inherit;
    -webkit-box-shadow: inherit;
    box-shadow: inherit;
    z-index: inherit;
  }

  .bg-white {
    background-color: #ffffff !important;
  }
  .p-4 {
    padding: 1.5rem !important;
  }
  .mb-0,
  .my-0 {
    margin-bottom: 0 !important;
  }
  .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }

  .user-dashboard-info-box .candidates-list .thumb {
    margin-right: 20px;
  }

  ul {
    list-style-type: disc; /* 원형 점 */
  }
`;

const Restaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState();
  //const [pick, setPick] = useState();
  const [activeTab, setActiveTab] = useState("menu");
  const [code, setCode] = useState(0);

  const data = JSON.parse(localStorage.getItem("user"));

  const { resCode } = useParams();
  const menus = useSelector((state) => state.menu.menuList); // 모든 메뉴 가져오기
  const discounts = useSelector((state) => state.discount.disList);
  const restaurant = useSelector(
    (state) => state.restaurant.selectedRestaurant
  );
  const reviews = useSelector((state) => state.review.reviewList);

  const user = useSelector((state) => {
    return state.user;
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const picks = useSelector((state) => state.restaurant.userPicks);

  const onHeartClick = async () => {
    if (user.id === undefined) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (isHearted) {
      console.log("삭제!");
      // 찜한게 있다!
      dispatch(asyncDeletePick(code.pickCode));
      setIsHearted(false);
      alert("해당 식당의 찜이 해제 되었습니다.");
    } else {
      console.log("추가!");
      // 찜하지 않았다는 것!
      dispatch(
        asyncUpdatePick({
          restaurant: {
            resCode: restaurant.resCode,
          },
          location: {
            localCode: restaurant.location.localCode,
          },
          food: {
            foodCode: restaurant.food.foodCode,
          },
          member: {
            id: user.id,
          },
        })
      );
      setIsHearted(true);
      alert("해당 식당이 찜 목록에 추가되었습니다.");
    }
    if (isHearted) {
    } else {
      console.log("not hearted");
    }
  };

  useEffect(() => {
    dispatch(asyncFindByDisCode(resCode));
  }, [resCode]);

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  console.log("유저 role : " + user.role);

  useEffect(() => {
    console.log(resCode);
    console.log(user);
    dispatch(asyncFindByMenuCode(resCode)); // resCode  ==> 얘 넣으면 오류남
    dispatch(asyncGetRestaurant(resCode));
    dispatch(asyncFindReviewByResCode(resCode)); // resCode로 예약가져오기

    if (user.id !== undefined) {
      dispatch(asyncFetchUserPicks(user.id));
    }
  }, [user]);

  useEffect(() => {
    console.log("내가 찜한 리스트 !");
    console.log(picks);

    const result = picks.filter((pick) => {
      if (
        pick.restaurant.resCode === restaurant.resCode &&
        pick.member.id === user.id
      ) {
        return pick.pickCode;
      }
    });

    console.log(result);

    if (result.length === 1) {
      setIsHearted(true);
      setCode(result[0]);
    } else {
      setIsHearted(false);
    }
  }, [picks]);

  useEffect(() => {
    console.log(isHearted);
  }, [isHearted]);

  const imagePaths = [
    "img/album1.jpg",
    "img/album2.jpg",
    "img/album3.jpg",
    "img/album1.jpg",
    "img/album2.jpg",
    "img/album3.jpg",
    "img/album1.jpg",
    "img/album2.jpg",
    "img/album3.jpg",
    "img/album1.jpg",
    "img/album2.jpg",
    "img/album3.jpg",

    // ..일단 이미지 경로 생성
  ];

  const onNavigate = () => {
    console.log("resCode 어떻게 보내지? : " + resCode);
    navigate(`/menuboard/${resCode}`);
  };

  return (
    <div
      style={{ marginTop: "80px", overflow: "hidden", whiteSpace: "nowrap" }}
    >
      <section className="container">
        <div className="row">
          <div className="col-4">
            <img
              src={"/upload/" + restaurant?.resPicture}
              className="rounded m-1 mx-auto d-block"
              alt=""
              style={{ height: "300px", width: "282px" }}
            />
          </div>
          <div className="col-4">
            <div className="res11 py-3">
              <h2 className="res111 fw-bold fs-3">{restaurant?.resName}</h2>
              <div className="res11 fs-6 fw-medium text-muted mt-2">
                {restaurant?.food?.foodType}
                <span
                  className="res2 fs-5 fw-bold text-muted"
                  style={{ margin: "0px 10px 0px 50px" }}
                >
                  <StarFill
                    className="bi bi-star-fill mb-1"
                    style={{ fontSize: "1.5rem", color: "#FBE94B" }}
                  />{" "}
                  4.6
                </span>
                <span className="res3 fs-6 fw-bold text-muted">
                  ㆍ리뷰 36 개
                </span>

                <span className="pick fs-6 " style={{ paddingLeft: "10px" }}>
                  <SuitHeartFill
                    className="bi bi-suit-heart fs-5"
                    style={{ color: isHearted ? "red" : "#aaa" }}
                    onClick={onHeartClick}
                  />{" "}
                  ({restaurant?.resPicks}) 찜하기
                </span>
              </div>
            </div>

            <table className="table table-borderless ">
              <tbody>
                <tr>
                  <td>주소</td>
                  <td colSpan="2"> {restaurant?.resAddr} </td>
                </tr>
                <tr>
                  <td>영업시간</td>
                  <td colSpan="2">
                    {restaurant?.resOpenHour} - {restaurant?.resClose}
                  </td>
                </tr>
                <tr>
                  <td>전화번호</td>
                  <td colSpan="2">{restaurant?.resPhone} </td>
                </tr>
                <tr>
                  <td className="align-top">주차</td>
                  <td className="align-top">{restaurant?.resDesc} </td>

                  <td width="75">
                    {(user.role === "사장" &&
                      restaurant?.member?.id === user.id) ||
                      user.role === "관리자" ? (
                      <button
                        type="button"
                        className="btn text-white fw-bold"
                        style={{
                          borderRadius: "50%",
                          backgroundColor: "#FF6B01",
                        }}
                        onClick={onNavigate}
                      >
                        메뉴 수정
                      </button>
                    ) : (
                      <Link
                        to={`reser`}
                        type="button"
                        className="btn text-white fw-bold"
                        style={{
                          borderRadius: "50%",
                          backgroundColor: "#FF6B01",
                        }}
                      >
                        예약
                      </Link>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    {discounts.map((discount) => (
                      <div
                        className="position-relative p-3 text-center text-muted bg-body border border-dashed rounded-3 mb-2"
                        key={discount.disCode}
                      >
                        <p>{discount.disDesc}</p>
                        <p>{discount.disPeriod}</p>
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <img
              src="img/map1.png"
              className="rounded m-1 mx-auto d-block"
              alt=""
              style={{ height: "300px", width: "282px" }}
            />
          </div>
        </div>
      </section>

      <StyleNav>
        <nav
          id="navbar-example2"
          className="row navbar sticky-top bg-body justify-content-center"
        >
          <ul
            className="col-lg-9 nav nav-pills"
            style={{ borderBottom: "2px solid #ddd" }}
          >
            <li
              className={`col nav-item text-center ${activeTab === "menu" ? "active" : ""
                }`}
            >
              <a
                className="nav-link fs-3 fw-semibold"
                href="#scrollspyHeading1"
                style={{ color: "#868383", padding: "15px" }}
                onClick={() => handleTabClick("menu")}
              >
                <img
                  src="/img/stick2.png"
                  alt=""
                  height="28px"
                  style={{ paddingTop: "5px" }}
                />{" "}
                메뉴
              </a>
            </li>
            <li
              className={`col nav-item text-center ${activeTab === "review" ? "active" : ""
                }`}
            >
              <a
                className="nav-link fs-3 fw-semibold"
                href="#scrollspyHeading2"
                style={{ color: "#868383", padding: "15px" }}
                onClick={() => handleTabClick("review")}
              >
                <img
                  src="/img/stick2.png"
                  alt=""
                  height="28px"
                  style={{ paddingTop: "5px" }}
                />{" "}
                리뷰
              </a>
            </li>
            <li
              className={`col nav-item text-center ${activeTab === "photo" ? "active" : ""
                }`}
            >
              <a
                className="nav-link fs-3 fw-semibold"
                href="#scrollspyHeading3"
                style={{ color: "#868383", padding: "15px" }}
                onClick={() => handleTabClick("photo")}
              >
                <img
                  src="/img/stick2.png"
                  alt=""
                  height="28px"
                  style={{ paddingTop: "5px" }}
                />{" "}
                사진
              </a>
            </li>
          </ul>
        </nav>

        <div className="tab-content">
          {activeTab === "menu" && (
            <div>
              <section className="container" id="scrollspyHeading1">
                <div
                  className="row"
                  style={{
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {/* <div className="col-2 text-center">
                    <StarFill
                      className="bi bi-star-fill"
                      style={{
                        fontSize: "1.3rem",
                        color: "#fbe94b",
                      }}
                    />
                    인기메뉴
                  </div> */}

                  {/* <div className="col-2 mb-2">
                    <img
                      src="img/pasta.jpg"
                      className="rounded m-1 mx-auto d-block"
                      alt=""
                      style={{ height: "150px", width: "150px" }}
                    />
                  </div>
                  <div className="col-8">
                    <span>
                      <div
                        className="foodname mb-3 mt-3"
                        style={{ fontWeight: "bold" }}
                      >
                        토마토 파스타
                      </div>
                      <div
                        className="description mb-3"
                        style={{ lineHeight: "25px" }}
                      >
                        알리오(마늘)와 올리오(기름 특히 올리브유)는 이탈리아
                        요리의 파스타 요리이다. 아브루초 주의 전통 요리로
                        이탈리아 전역에서 널리 먹는 파스타
                      </div>
                      <div>11,900 원</div>
                    </span>
                  </div> */}
                  <div>
                    {menus.map((menu) => (
                      <div
                        className="row"
                        style={{
                          borderBottom: "1px solid #ddd",
                        }}
                        key={menu.menuCode}
                      >
                        <div
                          className="col-2 mb-2 text-center"
                          style={{ lineheight: "150px" }}
                        ></div>
                        <div className="col-2 mb-3 mt-3">
                          <img
                            src={"/upload/" + menu.menuPicture}
                            className="rounded m-1 mx-auto d-block"
                            style={{ height: "150px", width: "150px" }}
                            alt={menu.menuName}
                          />
                        </div>
                        <div className="col-8 ">
                          <span>
                            <div
                              className="foodname mb-3 mt-3"
                              style={{ fontWeight: "bold" }}
                            >
                              {menu.menuName}
                            </div>
                            <div
                              className="description mb-3"
                              style={{ lineHeight: "25px" }}
                            >
                              {menu.menuDesc}
                            </div>
                            <div>{menu.menuPrice} 원</div>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          <StyleReview>
            {activeTab === "review" && (
              <div>
                <section
                  className="container mb-4"
                  id="scrollspyHeading2"
                  style={{ paddingTop: "30px" }}
                >
                  <div className="container">
                    <div className="row align-items-center">
                      {/* 여기부분! div정렬 수정 */}
                      <div className="col-3 text-center d-flex flex-column align-items-center">
                        <h2 className="fs-1">3.8</h2>
                        <div className="d-inline">
                          <StarFill
                            className="bi bi-star-fill"
                            style={{
                              fontSize: "1.3rem",
                              color: "#fbe94b",
                              margin: "3px",
                            }}
                          />
                          <StarFill
                            className="bi bi-star-fill"
                            style={{
                              fontSize: "1.3rem",
                              color: "#fbe94b",
                              margin: "3px",
                            }}
                          />
                          <StarFill
                            className="bi bi-star-fill"
                            style={{
                              fontSize: "1.3rem",
                              color: "#fbe94b",
                              margin: "3px",
                            }}
                          />
                          <StarFill
                            className="bi bi-star-fill"
                            style={{
                              fontSize: "1.3rem",
                              color: "#fbe94b",
                              margin: "3px",
                            }}
                          />
                          <StarFill
                            className="bi bi-star-fill"
                            style={{
                              fontSize: "1.3rem",
                              color: "#fbe94b",
                              margin: "3px",
                            }}
                          />
                        </div>
                        <Link
                          to={`addReview`}
                          className="btn mt-3"
                          type="button"
                          style={{
                            height: "50px",
                            width: "200px",
                            backgroundColor: "#ff6b01",
                            color: "white",
                          }}
                        >
                          리뷰쓰기
                        </Link>
                      </div>
                      <div className="col-9">
                        <div
                          className="row align-items-center"
                          style={{ marginBottom: "1%" }}
                        >
                          <div className="col-1">5점</div>
                          <div className="col-10">
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "60%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">12명</div>
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ marginBottom: "1%" }}
                        >
                          <div className="col-1">4점</div>
                          <div className="col-10">
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "10%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">2명</div>
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ marginBottom: "1%" }}
                        >
                          <div className="col-1">3점</div>
                          <div className="col-10">
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">0명</div>
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ marginBottom: "1%" }}
                        >
                          <div className="col-1">2점</div>
                          <div className="col-10">
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "20%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">4명</div>
                        </div>
                        <div
                          className="row align-items-center "
                          style={{ marginBottom: "1%" }}
                        >
                          <div className="col-1">0점</div>
                          <div className="col-10">
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "10%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">2명</div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="eee"
                      style={{
                        borderTop: "2px solid #ddd",
                        marginTop: "50px",
                      }}
                    ></div>

                    <div className="container mt-3 mb-4">
                      <div className="col">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                              <table className="table manage-candidates-top mb-0">
                                <thead>
                                  <tr>
                                    <th className="fw-bold">리뷰 116건</th>
                                    <th className="text-center fw-bold">
                                      최신순
                                    </th>
                                    <th className="text-center fw-bold">
                                      평점높은순
                                    </th>
                                    <th className="text-center fw-bold">
                                      평점낮은순
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                {reviews.map((review, index) => (
                                  <tr
                                    className="candidates-list"
                                    key={review.reviewCode}
                                    style={{ borderBottom: "1px solid #ddd" }}
                                  >
                                    <td className="title">
                                      {/* <div className="thumb">
                                      <img
                                        className="rounded-circle"
                                        src="img/lesser_panda.jpg"
                                        alt=""
                                      />
                                    </div> */}
                                      <div className="candidate-list-details">
                                        <div className="candidate-list-title">
                                          <h5 className="mb-0 fw-semibold">
                                            {review.member.name}
                                          </h5>
                                        </div>
                                        <div className="candidate-list-star">
                                          <h5>{review.reviewGrade}점</h5>
                                          {/* <StarFill
                                          className="bi bi-star-fill"
                                          style={{
                                            fontSize: "1.2rem",
                                            color: "#fbe94b",
                                            margin: "2px",
                                          }}
                                        /> */}
                                        </div>
                                      </div>
                                      <div className="candidate-list-details">
                                        {/* <ul className="candidate-list-favourite-time text-center">
                                        <li className="menu">토마토 파스타</li>
                                        <li className="menu">페퍼로니 피자</li>
                                        <li className="data">2023.8.23</li>
                                      </ul> */}
                                        <div
                                          className="text-center"
                                          style={{
                                            margin: "0px 10px 10px 50px",
                                          }}
                                        >
                                          <img
                                            src={"/upload/" + review.reviewPhoto}
                                            className="rounded m-1"
                                            alt=""
                                            style={{
                                              height: "150px",
                                              width: "150px",
                                            }}
                                          />
                                        </div>
                                        <div
                                          className="review"
                                          style={{
                                            margin: "25px 10px 5px 70px",
                                          }}
                                        >
                                          {review.reviewContent}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="candidate-list-favourite-time text-center">
                                      <span className="candidate-list-time order-1">
                                        좋아요 3
                                      </span>
                                    </td>
                                    <td className="candidate-list-favourite-time text-center">
                                      <span className="candidate-list-time order-1">
                                        싫어요 1
                                      </span>
                                    </td>
                                    <td></td>
                                  </tr>
                                ))}
                              </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </StyleReview>

          {activeTab === "photo" && (
            <div>
              <section
                className="cantainer"
                id="scrollspyHeading3"
                style={{ paddingTop: "30px" }}
              >
                <div className="container text-center mt-lg-0">
                  <div className="row">
                    {imagePaths.map((path, index) => (
                      <div className="col" key={index}>
                        <img src={path} alt={`Album ${index + 1}`} />
                      </div>
                    ))}
                  </div>

                  <div
                    className="eee"
                    style={{ borderTop: "2px solid #ddd", marginTop: "50px" }}
                  ></div>
                  <div className="container mt-3 mb-4">
                    <div className="col">
                      <div className="row">
                        <div className="col-md-12">
                          {/* <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm"></div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </StyleNav>
    </div>
  );
};

export default Restaurant;
