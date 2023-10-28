import React from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { asyncDeleteMember, asyncUpdateMember } from "../../store/userSlice";
import { userLogout } from "../../store/userSlice";

const H1 = styled.h1`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  paddingbottom: 20px;
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  margin: 30px 0;
  padding: 5px;

  button {
    width: 100%;
    height: 60px;
    padding: 10px;

    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #f8cdc1;
    font-family: "omyu_pretty";
    font-size: 1.5rem;

    &:hover {
      background-color: #ff5e33;
      color: #fff;
    }
  }
`;

const MemberUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [nickname, setNickname] = useState(user.nickname);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  // 회원정보 수정하기
  const onUpdateMember = async (e) => {
    e.preventDefault();

    const updateMember = {
      token: localStorage.getItem("token"),
      id: e.target.id.value,
      password: e.target.password.value,
      name: e.target.name.value,
      nickname: e.target.nickName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };
    dispatch(asyncUpdateMember(updateMember));

    // 수정 완료 후 마이페이지로 이동
    navigate(`/myPage/${user.id}`);
  };

  // 탈퇴하기
  const onDeleteMember = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm("정말로 탈퇴 하시겠습니까?");

    if (confirmed) {
      const userId = user.id;
      console.log("탈퇴할 회원 아이디 = " + userId);

      dispatch(asyncDeleteMember(userId));
      alert("탈퇴되었습니다. 그동안 이용해주셔서 감사합니다.");
      dispatch(userLogout());
      navigate("/");
    }
  };

  return (
    <Container style={{ marginTop: "150px" }}>
      <H1>회원 정보 수정</H1>
      <Form onSubmit={onUpdateMember}>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.id}
            name="id"
            readOnly
            // onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            value={name}
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            value={nickname}
            name="nickName"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="phone"
            value={phone}
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <BtnArea style={{ gap: "20px" }}>
          <button type="submit" onClick={onUpdateMember}>
            <span>회원정보 수정하기</span>
          </button>
          <button type="button" onClick={onDeleteMember}>
            <span>탈퇴하기</span>
          </button>
        </BtnArea>
      </Form>
    </Container>
  );
};

export default MemberUpdate;
