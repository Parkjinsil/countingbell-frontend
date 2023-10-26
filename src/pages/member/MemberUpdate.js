import React from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
import { asyncUpdateMenu, asyncGetMenus } from "../../store/menuSlice";
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

const MemberUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  <Container>
    <H1>회원 정보 수정</H1>
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
  </Container>;
};

export default MemberUpdate;
