import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddMenu } from "../../store/menuSlice";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const AddMenu = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(); // 새로운 FormData 객체 생성
    formData.append("resCode", e.target.resCode.value);
    formData.append("menuPicture", e.target.menuPicture.files[0]);
    // 파일은 e.target.menuPicture.files로 접근
    formData.append("menuName", e.target.menuName.value);
    formData.append("menuPrice", e.target.menuPrice.value);
    console.log(formData);

    dispatch(asyncAddMenu(formData));
  };

  return (
    <Container>
      <H1>메뉴등록하기</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="식당 코드"
            name="resCode"
            // value={formData.resCode}
            // onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="메뉴 입력"
            name="menuName"
            // value={formData.menuName}
            // onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="가격입력"
            name="menuPrice"
            // value={formData.menuPrice}
            // onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            placeholder="메뉴사진"
            name="menuPicture"
            // onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="메뉴 등록" />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddMenu;
