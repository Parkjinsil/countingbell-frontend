import React, { useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncFindReviewById } from "../../store/reviewSlice";

const ReviewList = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const reviews = useSelector((state) => state.review.reviewList);

    useEffect(() => {
        dispatch(asyncFindReviewById(id));
    }, []);

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
                <th>리뷰코드</th>
                <th>식당명</th>
                <th>이미지</th>
                <th>리뷰내용</th>
                <th>작성날짜</th>
              </tr>
            </thead>
            <tbody
              className="table-group-divider"
              style={{ lineHeight: " 100px" }}
            >
              {reviews.map((review, index) => (
                <tr key={review.reviewCode} style={{ lineHeight: "150px" }}>
                  <td>{review.reviewCode}</td>
                  <td>{review.restaurant.resName}</td>
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