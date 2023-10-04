import React, { useState } from "react";
import styled from "styled-components";
import { addMember } from "../api/Member";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: azure;
`;

const Wrapper = styled.div`
  display: block;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  height: 580px;
`;

const Title = styled.div`
  text-align: center;
  font-family: "omyu_pretty";
  font-size: 2.5rem;
  /* background-color: aqua; */

  padding: 10px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: block;
  justify-content: center;
  font-family: "omyu_pretty";

  /* background-color: bisque; */

  p {
    margin: 5px 0;
    font-size: 1.2rem;
    /* font-weight: bold;
    font-family: "omyu_pretty"; */
  }

  input,
  select {
    width: 100%;
    padding: 7px;
  }

  label {
    display: flex;
    gap: 5px;
    background-color: aliceblue;
    width: 100%;

    #gender {
      width: 100%;
      padding: 7px;
    }
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  margin: 15px;
  padding: 10px;

  button {
    width: 100%;
    padding: 10px;

    border: none;
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
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    userName: "",
    birth_yy: "",
    birth_mm: "",
    birth_dd: "",
    email: "",
    phone: "",
    gender: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const registerSubmit = async () => {
    const formData = new FormData();
    formData.append("id", formData.id);
    formData.append("password", formData.password);
    formData.append("userName", formData.userName);

    formData.append("email", formData.email);
    formData.append("phone", formData.phone);
    formData.append("gender", formData.gender);

    const birth = `${formData.birth_yy}-${formData.birth_mm}-${formData.birth_dd}`;
    formData.append("birth", birth);

    addMember(formData);

    try {
      await addMember(formData);
      console.log("회원 등록 성공");
      navigate("/");
    } catch (error) {
      console.error("회원 등록 실패:", error);
      alert("회원 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <form onSubmit={registerSubmit}>
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
                  value={formData.id}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={onChange}
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
                  value={formData.password}
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
                  id="userName"
                  value={formData.userName}
                  type="text"
                  placeholder="이름을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="nameError"></div>
            </div>

            <div className="birth">
              <p>생년월일</p>
              <label id="birthBox">
                <input
                  id="birth_yy"
                  type="text"
                  placeholder="년(4자)"
                  value={formData.birth_yy}
                  onChange={onChange}
                ></input>
                <select
                  id="birth_mm"
                  value={formData.birth_mm}
                  onChange={onChange}
                >
                  <option>월</option>
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <input
                  type="text"
                  id="birth_dd"
                  placeholder="일"
                  value={formData.birth_dd}
                  onChange={onChange}
                />
              </label>
              <div className="birthError"></div>
            </div>

            <div className="email">
              <p>이메일</p>
              <label>
                <input
                  id="email"
                  type="text"
                  value={formData.email}
                  placeholder="이메일을 입력해주세요."
                  onChange={onChange}
                ></input>
              </label>
              <div className="emailError"></div>
            </div>
            <div className="phone">
              <p>전화번호</p>
              <label>
                <input
                  id="phone"
                  value={formData.phone}
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  onChange={onChange}
                  required
                />
              </label>
              <div className="phoneError"></div>
            </div>
            <div>
              <div className="gender">
                <p>성별</p>
                <label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={onChange}
                  >
                    <option>성별</option>
                    <option value="man">남성</option>
                    <option value="woman">여성</option>
                  </select>
                </label>
                <div id="genderError" className="error"></div>
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
