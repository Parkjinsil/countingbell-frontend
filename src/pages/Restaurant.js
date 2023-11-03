import React, { useEffect, useState } from "react";
import { } from "react-bootstrap";
import { StarFill, SuitHeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styled from "styled-components";
import ResMap from "./restaurants/ResMap";

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
  const [reviews, setReviews] = useState([]); // 리뷰 상태

  const data = JSON.parse(localStorage.getItem("user"));

  const { resCode } = useParams();
  const menus = useSelector((state) => state.menu.menuList); // 모든 메뉴 가져오기
  const discounts = useSelector((state) => state.discount.disList);
  const restaurant = useSelector(
    (state) => state.restaurant.selectedRestaurant
  );

  useEffect(() => {
    // 리뷰 데이터 가져오기
    const fetchReviews = async () => {
      try {
        const response = await dispatch(asyncFindReviewByResCode(resCode));
        if (response.payload) {
          const newReviews = response.payload;
          setReviews(newReviews); // 리뷰 데이터를 리뷰 상태로 업데이트
        }
      } catch (error) {
        console.error('리뷰 데이터를 가져오는 중 오류 발생: ', error);
      }
    };

    // 페이지 로드 시 리뷰 데이터 가져오기
    fetchReviews();
  }, [dispatch, resCode]);

  // 리뷰 데이터를 리뷰 평점 순으로 정렬
  const onHighGrade = () => {
    const sortedReviews = [...reviews].sort((a, b) => b.reviewGrade - a.reviewGrade);
    setReviews(sortedReviews); // 정렬된 리뷰를 리뷰 상태로 업데이트
  };

  // 리뷰 데이터를 최신 순으로 정렬
  const onRecent = () => {
    const sortedDates = [...reviews].sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
    setReviews(sortedDates);
  }

  // 리뷰 평점별 개수
  const fiveReviews = reviews.filter((review) => review.reviewGrade === 5);
  const fourReviews = reviews.filter((review) => review.reviewGrade === 4);
  const threeReviews = reviews.filter((review) => review.reviewGrade === 3);
  const twoReviews = reviews.filter((review) => review.reviewGrade === 2);
  const oneReviews = reviews.filter((review) => review.reviewGrade === 1);

  // 리뷰 묶음
  const reviewGroups = [fiveReviews, fourReviews, threeReviews, twoReviews, oneReviews];
  const widths = {};

  for (let i = 0; i <= 4; i++) {
    const group = reviewGroups[i];
    if (group.length !== 0) {
      widths[5 - i] = `${Math.floor((group.length / reviews.length) * 100)}%`;
    } else {
      widths[5 - i] = "0%";
    }
  }

  // 리뷰 평점
  let reviewSum = 0;
  for (let i = 0; i < reviews.length; i++) {
    reviewSum += reviews[i].reviewGrade;
  }
  // console.log("총합"+reviewSum);


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
      style={{ marginTop: "80px", overflow: "hidden" }}
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
                  {Math.round((reviewSum / reviews.length) * 10) / 10}
                </span>
                {/* <span className="res3 fs-6 fw-bold text-muted">
                  {reviews.length}
                </span> */}

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

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td >주소 </td>
                  <td>{restaurant?.resAddr}</td>
                </tr>
                <tr>
                  <td >영업시간 </td>
                  <td>{restaurant?.resOpenHour} - {restaurant?.resClose}</td>
                </tr>
                <tr >
                  <td>전화번호 </td>
                  <td>{restaurant?.resPhone} </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="align-top" colspan="2" align="left" >{restaurant?.resDesc}ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ </td>
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
                <tr>
                  <td colspan="2" width="75" align="right">
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

              </tfoot>
            </table>
          </div>
          <div className="col-4">
            <div
              className="rounded m-1 mx-auto d-block"
              style={{ height: "300px", width: "282px" }}
            >
              <ResMap resAddr={restaurant.resAddr} />
            </div>
          </div>
        </div>
      </section >

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
                        <h2 className="fs-1">{Math.round((reviewSum / reviews.length) * 10) / 10}</h2>
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
                                style={{ width: widths[5] }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">{fiveReviews.length}명</div>
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
                                style={{ width: widths[4] }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">{fourReviews.length}명</div>
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
                                style={{ width: widths[3] }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">{threeReviews.length}명</div>
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
                                style={{ width: widths[2] }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">{twoReviews.length}명</div>
                        </div>
                        <div
                          className="row align-items-center"
                          style={{ marginBottom: "1%" }}
                        >
                          <div className="col-1">1점</div>
                          <div className="col-10">
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: widths[1] }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-1">{oneReviews.length}명</div>
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
                                  <tr style={{ display: "flex" }}>
                                    <th className="fw-bold">
                                      <span>전체 {reviews.length}건</span>
                                      <button onClick={onRecent}
                                        style={{
                                          backgroundColor: "transparent",
                                          padding: "10px",
                                          marginLeft: "680px",
                                          borderRadius: "5px",
                                          border: "1px solid #888"
                                        }}
                                      >
                                        최신순
                                      </button>
                                      <button onClick={onHighGrade}
                                        style={{
                                          backgroundColor: "transparent",
                                          padding: "10px",
                                          marginLeft: "10px",
                                          borderRadius: "5px",
                                          border: "1px solid #888"
                                        }}
                                      >
                                        평점높은순
                                      </button>
                                      <button onClick={onHighGrade}
                                        style={{
                                          backgroundColor: "transparent",
                                          padding: "10px",
                                          marginLeft: "10px",
                                          borderRadius: "5px",
                                          border: "1px solid #888"
                                        }}
                                      >
                                        평점낮은순
                                      </button>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {reviews.map((review, index) => (
                                    <tr
                                      className="candidates-list"
                                      key={review.reviewCode}
                                      style={{
                                        borderBottom: "1px solid #ddd",
                                        display: "flex"
                                      }}
                                    >
                                      <td className="title"
                                        style={{ flex: "1" }}>
                                        <div className="candidate-list-details">
                                          <div>
                                            <h3 className="mb-0"
                                              style={{
                                                fontSize: "20px",
                                                marginLeft: "20px"
                                              }}>
                                              {review.member.name}
                                            </h3>
                                          </div>
                                          <div className="candidate-list-star"
                                            style={{
                                              marginLeft: "20px",
                                              paddingTop: "45px"
                                            }}>
                                            <h5>{review.reviewGrade}점</h5>
                                          </div>
                                          <div style={{
                                            marginLeft: "20px",
                                            paddingTop: "20px"
                                          }}>
                                            <h3>{review.reviewDate.substring(0, 10)}</h3>
                                          </div>
                                        </div>
                                        <div className="candidate-list-details">
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
                                                width: "200px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div style={{
                                          width: "300px",
                                          height: "100px",
                                          padding: "10px 30px"
                                        }}>
                                          <span className="candidate-list-time order-1"
                                            style={{ whiteSpace: "pre-wrap" }}>
                                            {review.reviewContent}
                                          </span>
                                        </div>
                                      </td>
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

        </div>
      </StyleNav>
    </div >
  );
};

export default Restaurant;
