import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddReview } from "../../store/reviewSlice";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.prevenDefault();
  }

  const formData = new FormData();
  formData.append("reviewGrade", e.target.reviewGrade.value);
  formData.append("reviewContent", e.target.reviewContent.value);
  formData.append("reviewPicture", e.target.reviewPicture.value);

  dispatch(asyncAddReview(formData))
    .then(() => {
      // 리뷰 작성이 성공하면 레스토랑 리뷰 목록을 다시 불러와 업데이트
      dispatch(asyncGetReviews(1, null));
      navigate("/restaurant");
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <Container>
      <H1>리뷰 작성하기</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="별점" name="reviewGrade" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="리뷰내용" name="reviewContent" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="file" placeholder="리뷰사진" name="reviewPhoto" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="리뷰 작성" />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddReview;