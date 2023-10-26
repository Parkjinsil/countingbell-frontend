import { useEffect, useState } from "react";
import styled from "styled-components";
import { addMember } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegister } from "../store/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: azure;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  display: block;
  background-color: #f8f9fa;
  padding: 30px 60px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* max-width: 700px; */
  width: 100%;
  height: 720px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 3rem;
  font-family: "omyu_pretty";
  padding: 10px;
`;

const InputContainer = styled.div`
  display: block;
  justify-content: center;
  width: 440px;

  div {
    padding: 3px 0;
  }

  p {
    margin: 5px 0;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: "omyu_pretty";
  }

  input,
  select {
    width: 100%;
    padding: 5px;
  }

  label {
    display: flex;
    gap: 5px;
    background-color: aliceblue;
    width: 100%;
  }
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

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserRegex = /^[a-zA-Z][a-zA-Z0-9-_]{4,19}$/; // 첫글자는 소문자, 대문자 알파벳, 나머지 글자는 소문자, 대문자, 숫자, 밑줄이 가능, 총 5~20글자
  const PwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 소문자, 대문자, 숫자, 특수문자 !@#$%가 꼭 들어있고 8~24글자
  const PhoneRegex = /^010([0-9]{8})$/; //  "010"으로 시작하고 이어서 숫자 8자리가 나오는 휴대폰 번호
  const EmailRegex =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  const user = useSelector((state) => {
    return state.user;
  });

  // 초기값 세팅
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    pwdCheck: "",
    name: "",

    nickName: "",
    email: "",
    phone: "",

    role: "고객",
  });

  const { id, password, pwdCheck, name, nickName, email, phone, role } =
    formData;

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const [errorMessages, setErrorMessages] = useState({
    id: "",
    password: "",
    pwdCheck: "",
    name: "",

    nickName: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = {};

    // 아이디 유효성 검사
    if (!id || !UserRegex) {
      newErrorMessages.id = "5~20자의 영문자와 숫자를 입력해주세요 ";
      isValid = false;
    }

    // 비밀번호 유효성 검사
    if (!password || !PwdRegex) {
      newErrorMessages.password =
        "8~24자의 영문, 숫자, 특수문자(!@#$%)를 모두 포함한 비밀번호를 입력해주세요";
      isValid = false;
    }

    // 비밀번호 재확인 유효성 검사
    if (password !== pwdCheck) {
      newErrorMessages.pwdCheck = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    // 이름 유효성 검사
    if (!name) {
      newErrorMessages.name = "이름을 입력해주세요.";
      isValid = false;
    }

    // 닉네임 유효성 검사
    if (!nickName) {
      newErrorMessages.nickName = "닉네임을 입력해주세요.";
      isValid = false;
    }

    // 이메일 유효성 검사
    if (!email || !EmailRegex) {
      newErrorMessages.email = "이메일 형식이 올바르지 않습니다.";
      isValid = false;
    }

    // 전화번호 유효성 검사 (간단한 형식 체크만 수행)
    if (!phone || !PhoneRegex) {
      newErrorMessages.phone = "'-'를 제외하고 입력해주세요'";
      isValid = false;
    }

    setErrorMessages(newErrorMessages);

    return isValid;
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(asyncRegister(formData));
    navigate("/login");
  };

  return (
    <Container>
      <form className="registerForm" onSubmit={registerHandler}>
        <Wrapper>
          <Title>
            <h1>회원가입</h1>
          </Title>
          <InputContainer>
            <div className="id">
              <p>아이디</p>
              <label>
                <input
                  id="id"
                  value={id}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={onChange}
                  maxLength="20"
                  required
                ></input>
              </label>
              <div className="idError"></div>
            </div>

            <div className="password">
              <p>비밀번호</p>
              <label>
                <input
                  id="password"
                  value={password}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="pwdError"></div>
            </div>
            <div className="pwdCheck">
              <p>비밀번호 재확인</p>
              <label>
                <input
                  id="pwdCheck"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={pwdCheck}
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="pwdError"></div>
            </div>
            <div className="userName">
              <p>이름</p>
              <label>
                <input
                  id="name"
                  value={name}
                  type="text"
                  placeholder="이름을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
            </div>

            <div className="nickName">
              <p>닉네임</p>
              <label>
                <input
                  id="nickName"
                  value={nickName}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
            </div>

            <div className="email">
              <p>이메일</p>
              <label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  placeholder="이메일을 입력해주세요."
                  onChange={onChange}
                ></input>
              </label>
              <div className="emailError"></div>
            </div>
            <div className="phone">
              <p>전화번호("-" 제외)</p>
              <label>
                <input
                  id="phone"
                  value={phone}
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  onChange={onChange}
                  required
                />
              </label>
            </div>

            <div>
              <div className="role">
                <p>구분</p>
                <label>
                  <select id="role" value={role} onChange={onChange}>
                    <option value="customer" defaultValue>
                      고객
                    </option>
                    <option value="owner">사장</option>
                  </select>
                </label>
              </div>
            </div>
          </InputContainer>
        </Wrapper>
        <BtnArea>
          <button type="submit">
            <span>가입하기</span>
          </button>
        </BtnArea>
      </form>
    </Container>
  );
};
export default Register;
