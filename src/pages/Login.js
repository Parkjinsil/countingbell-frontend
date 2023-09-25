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
  height: 400px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Title = styled.p`
  font-size: 2rem;
  color: #ff5e33;
  font-family: "Luckiest Guy", cursive;
  text-shadow: 2px 2px 3px rgb(66, 61, 61);
`;

const InputContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;

  label {
    display: flex;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff5e33;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Login = () => {
  return (
    <Container>
      <LoginBox>
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
          <Title>COUNTINGBELL</Title>
        </LogoContainer>
        <form action="signIn" id="signIn" name="signIn" method="POST">
          <InputContainer>
            <label htmlFor="id">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" name="id" id="id" />
            </label>
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" name="password" id="password" />
            </label>
          </InputContainer>
          <Button type="submit">로그인</Button>
        </form>
      </LoginBox>
    </Container>
  );
};

export default Login;
