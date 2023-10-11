import React from "react";
import logo from "../assets/LOGO.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncLogin } from "../store/userSlice";

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
  height: 500px;
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
  padding-right: 10px;
  line-height: 30px;

  div {
    margin: 5px 0;
    padding: 15px 0;
  }

  span {
    padding: 15px;
  }

  #icon {
    margin-right: 5px;
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
  display: inline-block;
  margin-left: 10px;
  width: 450px;
  padding: 15px 5px;
`;

const Button = styled.button`
  width: 430px;
  padding: 10px;
  margin-top: 10px;
  background-color: #ff5e33;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
`;

const LoginBottom = styled.div`
  padding-top: 30px;
  display: flex;

  span {
    margin: 0 50px;
  }

  a {
    color: black;

    &:hover {
      color: #ff5e33;
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 홈으로 이동
  const onSubmit = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    dispatch(asyncLogin({ id, password }));
    navigate("/");
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <LoginBox>
          <LogoContainer>
            <Link to="/">
              <img src={logo} />
              <p id="title">COUNTINGBELL</p>
            </Link>
          </LogoContainer>
          <InputContainer>
            <div className="idBox">
              <span>
                <FontAwesomeIcon icon={faUser} id="icon" />
              </span>
              <input type="text" name="id" autofocus></input>
            </div>
            <div className="pwdBox">
              <span>
                <FontAwesomeIcon icon={faLock} id="icon" />
              </span>
              <input type="password" name="password" />
            </div>
          </InputContainer>
          <BottomContainer>
            <Button type="submit">로그인</Button>

            <LoginBottom>
              <span>
                <Link to="/find">아이디/비밀번호 찾기</Link>
              </span>
              <span>
                <Link to="/signup">회원가입</Link>
              </span>
            </LoginBottom>
          </BottomContainer>
        </LoginBox>
      </form>
    </Container>
  );
};

export default Login;
