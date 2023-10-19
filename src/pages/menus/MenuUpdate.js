import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncUpdateMenu, asyncGetMenus } from "../../store/menuSlice";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const MenuUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resCode", formData.resCode);
    formData.append("menuName", formData.menuName);
    formData.append("menuPrice", formData.menuPrice);
    formData.append("menuPicture", formData.menuPicture);
    console.log(formData);

    dispatch(asyncUpdateMenu(formData))
      .then(() => {
        // 메뉴 등록이 성공하면 메뉴 목록을 다시 불러와서 업데이트합니다.
        dispatch(asyncGetMenus(1, null));
        navigate("/menuboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <H1>메뉴 수정</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="식당 코드" name="resCode" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="메뉴명" name="menuName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="메뉴가격" name="menuPrice" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            placeholder="메뉴 사진"
            name="menuPicture"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="메뉴 수정" />
        </Form.Group>
      </Form>
    </Container>
  );
};
export default MenuUpdate;
