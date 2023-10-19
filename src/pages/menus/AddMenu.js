import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  asyncAddMenu,
  asyncGetMenus,
  asyncDeleteMenu,
} from "../../store/menuSlice";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const AddMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // 새로운 FormData 객체 생성
    formData.append("resCode", e.target.resCode.value);
    formData.append("menuPicture", e.target.menuPicture.files[0]);
    // 파일은 e.target.menuPicture.files로 접근
    formData.append("menuName", e.target.menuName.value);
    formData.append("menuPrice", e.target.menuPrice.value);
    console.log(formData);

    dispatch(asyncAddMenu(formData))
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
      <H1>메뉴등록하기</H1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="식당 코드" name="resCode" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="메뉴 입력" name="menuName" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="가격입력" name="menuPrice" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="file" placeholder="메뉴사진" name="menuPicture" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="메뉴 등록" />
        </Form.Group>
      </Form>

      {/* <button onClick={handleDelete}>메뉴 삭제</button> */}
    </Container>
  );
};

export default AddMenu;
