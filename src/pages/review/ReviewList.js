import React, { useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncFindReviewById, asyncUpdateReview } from "../../store/reviewSlice";
import { deleteReview } from "../../api/review";
import { ListTask } from "react-bootstrap-icons";
import { useState } from "react";

const ReviewList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const reviews = useSelector((state) => state.review.reviewList);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewPhoto, setReviewPhoto] = useState(null);
  const [reviewGrade, setReviewGrade] = useState("");
  const [reviewCode, setReviewCode] = useState("");
  const [resCode, setResCode] = useState("");

  useEffect(() => {
    dispatch(asyncFindReviewById(id));
  }, []);

  // 리뷰 수정
  const onUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("reviewCode", reviewCode);
    formData.append("reviewContent", reviewContent);
    formData.append("reviewGrade", reviewGrade);
    formData.append("reviewPhoto", reviewPhoto);
    formData.append("resCode", resCode);
    formData.append("id", id);

    dispatch(asyncUpdateReview(formData));
  };

  const onDelete = async (reviewCode) => {
    try {
      await deleteReview(reviewCode);
      alert("리뷰를 삭제했습니다.");

        // 취소 후 화면을 새로 고침
        window.location.reload();
    } catch (error) {
      // console.log(reviewCode);
      alert(`리뷰 삭제에 실패했습니다. 에러: ${error.message}`);
    }
  }

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5  bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <div
          className="input-group mb-3"
          style={{ width: "300px", marginLeft: "900px" }}
        >
        </div>
        <Container>
          <table className="table table-hover" style={{ marginTop: "30px" }}>
            <thead>
              <tr>
                <th>식당명</th>
                <th>평점</th>
                <th>이미지</th>
                <th>리뷰내용</th>
                <th>작성날짜</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody
              className="table-group-divider"
              style={{ lineHeight: " 100px" }}
            >
              {reviews.map((review, index) => (
                <tr key={review.reviewCode} style={{ lineHeight: "150px" }}>
                  <td>{review.restaurant.resName}</td>
                  <td>{review.reviewGrade}점</td>
                  <td style={{ alignItems: "center" }}>
                    <img
                      src={"/upload/" + review.reviewPhoto}
                      style={{
                        width: "150px",
                        height: "100px",
                        borderRadius: "10%",
                      }}
                    />
                  </td>
                  <td>{review.reviewContent}</td>
                  <td>{review.reviewDate}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${review.reviewCode}`}
                      data-bs-whatever="@mdo"
                      onClick={() => {
                        setReviewContent(review.reviewContent);
                        setReviewCode(review.reviewCode);
                        setReviewPhoto(review.reviewPhoto);
                        setReviewGrade(review.reviewGrade);
                        setResCode(review.restaurant.resCode);
                      }}
                    >
                      수정
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${review.reviewCode}`}
                      tabIndex="-1"
                      aria-labelledby={`exampleModalLabel${review.reviewCode}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              메뉴 수정하기
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
                                  value={review.restaurant.resCode}
                                  onChange={(e) => {
                                    setResCode(e.target.value);
                                  }}
                                  readOnly
                                />
                              </div>
                              <div className="mb-3" hidden>
                                <label
                                  htmlFor="resCode"
                                  className="col-form-label"
                                >
                                  아이디 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="id"
                                  value={review.member.id}
                                  onChange={(e) => {
                                    // setId(e.target.value);
                                  }}
                                  readOnly
                                />
                              </div>
                              <div className="mb-3" hidden>
                                <label
                                  htmlFor="reviewCode"
                                  className="col-form-label"
                                >
                                  리뷰코드 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="reviewCode"
                                  value={review.reviewCode}
                                  onChange={(e) => {
                                    setReviewCode(e.target.value);
                                  }}
                                  readOnly
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="reviewGrade"
                                  className="col-form-label"
                                >
                                  평점 :
                                </label>
                                <select
                                className="form-control"
                                id="reviewGrade"
                                value={reviewGrade}
                                onChange={(e) => {
                                  setReviewGrade(e.target.value);
                                }}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <div>
                                <label
                                  htmlFor="reviewContent"
                                  className="col-form-label"
                                >
                                  리뷰 내용 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="reviewContent"
                                  value={reviewContent}
                                  onChange={(e) => {
                                    setReviewContent(e.target.value);
                                  }}
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="reviewPhoto"
                                  className="col-form-label"
                                >
                                  이미지 :
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="reviewPhoto"
                                  onChange={(e) => {
                                    setReviewPhoto(e.target.files[0]);
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
                              value={review}
                            >
                              확인
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(review.reviewCode)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    </div>
  )

}

export default ReviewList;