import React from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
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

  // id,
  //   password,
  //   pwdCheck,
  //   name,
  //   age,
  //   nickName,
  //   email,
  //   phone,
  //   gender,
  //   role,

  const updateMember = async (e) => {};

  <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
    <Form onSubmit={updateMember}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="아이디"
          name="id"
          value={user.id}
          onChange={(e) => {
            // setID(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="수정할 위치 입력"
          name="localName"
          value={user.password}
          onChange={(e) => {
            // setPassword(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control type="submit" value="위치 수정" />
      </Form.Group>
    </Form>
  </div>;
};

export default MemberUpdate;
