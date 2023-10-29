import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  asyncDeleteMember,
  asyncUpdateMember,
  userSave,
} from "../../store/userSlice";
import { userLogout } from "../../store/userSlice";
import { checkNickname } from "../../api/user";
import { regExpEmail, regExpPhone, regExpPwd } from "./regExp";

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

  const nicknameRef = useRef(null);
  const [nickDup, setNickDup] = useState(false); // 닉네임 중복확인
  const [validPwd, setValidPwd] = useState(false); // password 정규식
  const [validPhone, setValidPhone] = useState(false); // 전화번호 정규식
  const [validEmail, setValidEmail] = useState(false); // 이메일 정규식

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, [user]);

  // 닉네임 중복확인
  const NicknameCheck = async () => {
    if (nicknameRef.current) {
      const result = await checkNickname({
        nickname: nicknameRef.current.value,
      });

      if (result.data) {
        alert("사용 가능한 닉네임입니다.");
        setNickDup(true);
      } else {
        alert("중복된 닉네임입니다!!!");
        setNickDup(false);
      }
    }
  };

  const RegExpPwd = () => {
    // 비밀번호 유효성 검사!!
    setValidPwd(regExpPwd(password));
  };

  const RegExpEmail = () => {
    setValidEmail(regExpEmail(email));
  };

  const RegExpPhone = () => {
    setValidPhone(regExpPhone(phone));
  };

  // 회원정보 수정하기
  const onUpdateMember = async (e) => {
    e.preventDefault();
    console.log(e); // 확인용 출력
    console.log(e.target.password); // 비밀번호 확인용 출력 == undefined떠

    const updateMember = {
      token: localStorage.getItem("token"),
      id: e.target.id.value,
      password: e.target.password.value, // 여기서 값을 못받아옴 == undefined떠
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
              console.log("비밀번호 들어오나?? : " + e.target.value); // 들어와O
              setPassword(e.target.value);
            }}
            onBlur={RegExpPwd}
          />
          <div className="pwdError">
            {validPwd ? (
              <span style={{ color: "green" }}>OK!</span>
            ) : (
              <span style={{ color: "red" }}>
                8~20글자 사이의 영문 대소문자, 특수문자(!, @, #, $, %), 숫자를
                최소 1개 이상 혼합한 비밀번호를 입력해주세요.
              </span>
            )}
          </div>
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
            ref={nicknameRef}
            onChange={(e) => {
              setNickname(e.target.value);
              setNickDup(false); // 닉네임이 변경되면 중복 상태 초기화
            }}
          />
          <button
            type="button"
            id="signupbtn2"
            className="btn btn-primary"
            style={{ zIndex: "0" }}
            onClick={NicknameCheck}
          >
            중복 확인
          </button>
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
            onBlur={RegExpPhone}
          />
          {validPhone ? (
            <span style={{ color: "green" }}>OK!</span>
          ) : (
            <span style={{ color: "red" }}>
              "-"를 제외한 핸드폰번호를 입력해주세요.
            </span>
          )}
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
            onBlur={RegExpEmail}
          />
          <div className="emailError">
            {validEmail ? (
              <span style={{ color: "green" }}>OK!</span>
            ) : (
              <span style={{ color: "red" }}></span>
            )}
          </div>
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
