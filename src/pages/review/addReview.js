import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddReview } from "../../store/reviewSlice";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { userSave } from "../../store/userSlice";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resCode } = useParams();

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("reviewGrade", e.target.reviewGrade.value);
    formData.append("reviewContent", e.target.reviewContent.value);
    formData.append("reviewPhoto", e.target.reviewPhoto.files[0]);
    formData.append("id", user.id);
    formData.append("resCode", resCode);

    dispatch(asyncAddReview(formData));
    navigate(`/restaurant/${resCode}`);
  };
  return (
    <Container>
      <H1>리뷰 작성하기</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control as="select" name="reviewGrade">
            <option value="">평점</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="리뷰내용"
            name="reviewContent"
          />
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
