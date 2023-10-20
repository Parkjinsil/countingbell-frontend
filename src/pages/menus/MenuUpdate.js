import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
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
  const menu = useSelector((state) => state.menu); // menu 상태 추가

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const updatedMenu = {
    //   menuCode: e.target.resCode.value, // 수정
    //   menuName: e.target.menuName.value,
    //   menuPrice: e.target.menuPrice.value,
    //   menuPicture: e.target.menuPicture.files[0],
    //   resCode: e.target.menu.restaurant.resCode.value,
    // };
    // dispatch(asyncUpdateMenu(updatedMenu))
    //   .then(() => {
    //     dispatch(asyncGetMenus(1, null));
    //     navigate("/menuboard");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <Container>
      <H1>메뉴 수정</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="식당 코드"
            name="resCode"
            value={menu.restaurant.resCode}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="메뉴명"
            name="menuName"
            value={menu.menuName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="메뉴가격"
            name="menuPrice"
            value={menu.menuPrice}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            placeholder="메뉴 사진"
            name="menuPicture"
            value={menu.menuPicture}
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
