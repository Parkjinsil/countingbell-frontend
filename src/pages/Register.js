import React, { useState } from "react";
import styled from "styled-components";
import { addMember } from "../api/user";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: azure;
  padding-top: 100px;
`;

const Wrapper = styled.div`
  display: block;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* max-width: 700px; */
  width: 100%;
  height: 800px;
`;

const Title = styled.div`
  text-align: center;

  font-size: 2.5rem;
  /* background-color: aqua; */

  padding: 10px;
`;

const InputContainer = styled.div`
  display: block;
  justify-content: center;

  div {
    padding: 3px 0;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
    font-weight: bold;
    /* font-family: "omyu_pretty"; */ */
  }

  input,
  select {
    width: 100%;
    padding: 5px ;
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

  margin: 10px 0;
  padding: 10px;

  button {
    width: 100%;
    padding: 10px;

    border: none;
    cursor: pointer;
    background-color: #f8cdc1;
    /* font-family: "omyu_pretty"; */
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
    userId: "",
    password: "",
    pwdCheck: "",
    userName: "",
    birth_yy: "",
    birth_mm: "",
    birth_dd: "",
    email: "",
    emailSelect: "",
    phoneNum: "",
    gender: "",
    NickName: "",
  });

  const onChange = (e) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    console.log("로그인시도!");
    e.preventDefault();
    // const birth = `${formData.birth_yy}-${formData.birth_mm}-${formData.birth_dd}`;
    // const email = `${formData.email}@${formData.emailSelect}`;
    // const updatedFormData = { ...formData, birth, email };

    try {
      const response = await addMember(formData);
      alert("회원 가입 성공. 로그인해주세요.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Wrapper>
          <Title>
            <h1>회원가입</h1>
          </Title>
          <InputContainer>
            <div className="id">
              <p>아이디</p>
              <label>
                <input
                  id="userId"
                  value={formData.userId}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="userIdError"></div>
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
                  value={formData.pwdCheck}
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

            <div className="NickName">
              <p>이름</p>
              <label>
                <input
                  id="NickName"
                  value={formData.NickName}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="nickNameError"></div>
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
                <span> @ </span>
                <select
                  id="emailSelect"
                  value={formData.emailSelect}
                  onChange={onChange}
                >
                  <option>이메일 선택</option>
                  <option>naver.com</option>
                  <option>gmail.com</option>
                  <option>daum.net</option>
                </select>
              </label>
              <div className="emailError"></div>
            </div>
            <div className="phoneNum">
              <p>전화번호("-" 제외)</p>
              <label>
                <input
                  id="phoneNum"
                  value={formData.phoneNum}
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  onChange={onChange}
                  required
                />
              </label>
              <div className="phoneNumError"></div>
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
