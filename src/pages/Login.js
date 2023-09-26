import React from "react";
import logo from "../assets/LOGO.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  text-align: center;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  height: 450px;
`;

const LogoContainer = styled.div`
  justify-content: center;
  display: flex;
  height: 100px;
  margin-top: 20px;
  /* background-color: blue; */

  img {
    width: 130px;
    height: 110px;
    padding-right: 12px;
  }
  a {
    text-decoration: none;
    display: flex;
  }
  P {
    font-size: 35px;
    line-height: 100px;
    color: #ff5e33;
    font-family: "Luckiest Guy", cursive;
    text-shadow: 2px 2px 3px rgb(66, 61, 61);
  }
`;

const InputContainer = styled.div`
  text-align: center;
  padding: 15px 20px;
  line-height: 30px;
  /* background-color: aqua; */

  div {
    margin: 15px 10px;
    padding-right: 10px;
  }

  span {
    padding: 15px;
    /* background-color: antiquewhite; */
  }

  input {
    width: 350px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: aliceblue;
  }
`;

const BottomContainer = styled.div`
  width: 500px;
  padding: 15px 0;
`;

const Button = styled.button`
  width: 430px;
  padding: 10px;
  background-color: #ff5e33;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
`;

const LoginBottom = styled.div`
  padding-top: 30px;
  display: inline-block;

  span {
    margin-right: 25px;
  }

  a {
    color: black;

    &:hover {
      color: #ff5e33;
    }
  }
`;

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // 비밀번호 찾기 페이지로 이동
  const handleFindPassword = (event) => {
    event.preventDefault();
  };

  // 아이디 찾기 페이지로 이동
  const handelFindId = (event) => {
    event.preventDefault();
  };

  // 회원가입 페이지로 이동
  const handelRegister = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <LoginBox>
          <LogoContainer>
            <a href="/">
              <img src={logo} />
              <p id="title">COUNTINGBELL</p>
            </a>
          </LogoContainer>
          <InputContainer>
            <div className="idBox">
              <span>
                <FontAwesomeIcon icon={faUser} id="icon" />
              </span>
              <input type="text" name="id" id="id" autofocus></input>
            </div>
            <div className="pwdBox">
              <span>
                <FontAwesomeIcon icon={faLock} id="icon" />
              </span>
              <input type="password" name="password" id="password" />
            </div>
          </InputContainer>
          <BottomContainer>
            <Button type="submit">로그인</Button>

            <LoginBottom>
              <span>
                <a href="#" onClick={handleFindPassword}>
                  비밀번호 찾기
                </a>
              </span>
              <span>
                <a href="#" onClick={handelFindId}>
                  아이디 찾기
                </a>
              </span>
              <span>
                <a href="#" onClick={handelRegister}>
                  회원가입
                </a>
              </span>
            </LoginBottom>
          </BottomContainer>
        </LoginBox>
      </form>
    </Container>
  );
};

export default Login;
