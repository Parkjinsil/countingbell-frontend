import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncSearchId, userSave } from "../store/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: azure;
`;

const HorizontalLine = styled.div`
  border-bottom: 1px solid #000; /* 선의 높이와 색상을 조절*/
  margin: 5px;
`;

const Wrapper = styled.div`
  display: block;
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  height: 500px;
`;

const Title = styled.div`
  h1 {
    text-align: center;
    font-family: "omyu_pretty";
    font-size: 2rem;
    font-weight: bold;
    padding: 15px;
  }
`;

const Radio = styled.div`
  text-align: center;
  font-family: "omyu_pretty";
  font-size: 1.2rem;
  display: flex;
  justify-content: space-evenly;
  padding: 15px;

  label {
    padding: 0 5px;
  }
`;

const InputContainer = styled.div`
  display: block;
  justify-content: center;
  font-family: "omyu_pretty";

  padding: 15px;

  .form-group {
    margin-bottom: 10px;
    font-size: 1.2rem;
    padding: 5px;
  }

  input {
    width: 100%;
    padding: 10px 0;
    margin-top: 5px;
  }

  button {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-family: "omyu_pretty";
    background-color: #f8cdc1;
    font-size: 1.5rem;

    &:hover {
      background-color: #ff5e33;
      color: #fff;
    }
  }
`;

const Bottom = styled.div`
  font-size: 1.2rem;
  padding: 0 5px;
  display: flex;
  justify-content: center;

  span {
    margin: 0 30px;
  }

  a {
    color: black;

    &:hover {
      color: #ff5e33;
    }
  }
`;

const Find = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // const [user, setUser] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
    console.log("아이디는:" + user);
  }, [user]);

  // 로그인 페이지로 이동
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  // 회원가입 페이지로 이동
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const [selectedOption, setSelectedOption] = useState("findId");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // 아이디 찾기
  const inputNameRef = useRef(null);
  const inputPhoneRef = useRef(null);

  const searchId = (e) => {
    e.preventDefault();

    // 이름과 핸드폰 번호 가져오기
    const name = inputNameRef.current.value;
    const phone = inputPhoneRef.current.value;

    const formData = {
      name: name,
      phone: phone,
    };

    console.log(formData);
    dispatch(asyncSearchId(formData));

    if (user) {
      alert(`${name}님의 아이디는 ${user} 입니다.`);
    } else {
      alert(`${name}님의 아이디를 찾을 수 없습니다.`);
    }
  };

  // 비밀번호 찾기
  const searchPwd = (event) => {
    event.preventDefault();

    const id = document.getElementById("inputId").value;
    const email = document.getElementById("inputEmail").value;

    alert(id + "님의 비밀번호는 ");
  };

  return (
    <Container>
      <form>
        <Wrapper>
          <Title>
            <h1>아이디 / 비밀번호 찾기</h1>
          </Title>
          <HorizontalLine></HorizontalLine>
          <Radio>
            <div className="radio-group">
              <input
                type="radio"
                id="findId"
                name="findOption"
                value="findId"
                checked={selectedOption === "findId"}
                onChange={handleOptionChange}
              />
              <label htmlFor="findId">아이디 찾기</label>
            </div>

            <div className="radio-group">
              <input
                type="radio"
                id="findPwd"
                name="findOption"
                value="findPwd"
                checked={selectedOption === "findPwd"}
                onChange={handleOptionChange}
              />
              <label htmlFor="findPwd">비밀번호 찾기</label>
            </div>
          </Radio>
          <InputContainer>
            {selectedOption === "findId" && (
              <div className="SearchId">
                <div className="form-group">
                  <label htmlFor="inputName">이름</label>
                  <div>
                    <input
                      type="text"
                      id="inputName"
                      name="inputName"
                      ref={inputNameRef}
                      placeholder="이름을 입력하세요"
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPhone">핸드폰 번호</label>
                  <div>
                    <input
                      type="text"
                      id="inputPhone"
                      name="inputPhone"
                      ref={inputPhoneRef}
                      placeholder="ex) 010-1234-5678"
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <button type="button" id="searchBtn" onClick={searchId}>
                    아이디 찾기
                  </button>
                </div>
              </div>
            )}

            {selectedOption === "findPwd" && (
              <div className="SearchPwd">
                <div className="form-group">
                  <label htmlFor="inputId">아이디</label>
                  <div>
                    <input
                      type="text"
                      id="inputId"
                      name="inputId"
                      placeholder="아이디를 입력하세요"
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail">이메일</label>
                  <div>
                    <input
                      type="text"
                      id="inputEmail"
                      name="inputEmail"
                      placeholder="이메일을 입력하세요"
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <button type="button" id="searchBtn2" onClick={searchPwd}>
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            )}

            <Bottom>
              <span>
                <a href="/login" onClick={handleLogin}>
                  로그인 하기
                </a>
              </span>
              <span>
                <a href="/signUp" onClick={handleRegister}>
                  회원가입
                </a>
              </span>
            </Bottom>
          </InputContainer>
        </Wrapper>
      </form>
    </Container>
  );
};

export default Find;
