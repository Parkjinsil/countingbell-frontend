import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddMenu, asyncGetMenus } from "../../store/menuSlice";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const AddMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resCode } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // 새로운 FormData 객체 생성
    formData.append("resCode", e.target.resCode.value);
    formData.append("menuPicture", e.target.menuPicture.files[0]);
    formData.append("menuName", e.target.menuName.value);
    formData.append("menuDesc", e.target.menuDesc.value);
    formData.append("menuPrice", e.target.menuPrice.value);

    dispatch(asyncAddMenu(formData));

    dispatch(asyncGetMenus(1, null));
    navigate(`/menuboard/${resCode}`);
  };

  return (
    <Container style={{ marginTop: "120px" }}>
      <H1>메뉴등록하기</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="식당 코드"
            name="resCode"
            value={resCode}
            hidden
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="메뉴명" name="menuName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="메뉴설명" name="menuDesc" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="가격" name="menuPrice" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="file" placeholder="메뉴사진" name="menuPicture" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="메뉴 등록" />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddMenu;
