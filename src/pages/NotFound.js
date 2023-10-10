
import React from "react";
import errorImg from "../assets/error.jpg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    padding: 50px;
  }

  img {
    max-width: 800px;
    height: auto;
    border-radius: 10%;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <div>
        <h1>페이지를 찾을 수 없습니다.</h1>
      </div>
      <div>
        <img src={errorImg} alt="error" />
      </div>
    </Container>
  );
};

export default NotFound;
