import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddPhoto } from "../../store/photoSlice";
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

const AddPhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resCode", e.target.resCode.value);
    formData.append("photoName", e.target.photoName.value);
    formData.append("resPhoto", e.target.resPhoto.files[0]);

    dispatch(asyncAddPhoto(formData))
      .then(() => {
        // dispatch(asyncGetPhotos(1, null));
        navigate("/photoboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <H1>식당사진 등록하기</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="식당 코드" name="resCode" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="사진 이름" name="photoName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="file" placeholder="식당 사진" name="resPhoto" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="식당 사진 등록" />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddPhoto;
