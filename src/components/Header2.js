import React from "react";
import logo from "../assets/LOGO.png";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100vw;
  display: inline-block;
`;

const HeadTopContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  background: #ff5e33;
`;

const HeadLogoContainer = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  height: 80px;
  margin-top: 20px;
  background-color: white;
`;

const HeadLogo = styled.div`
  display: flex;
  img {
    width: 130px;
    height: 80px;
    padding-right: 10px;
  }
  a {
    text-decoration: none;
    display: flex;
  }
  P {
    font-size: 35px;
    line-height: 80px;
    color: #ff5e33;
    font-family: "Luckiest Guy", cursive;
    text-shadow: 2px 2px 3px rgb(66, 61, 61);
  }
`;

const ScrollToTop = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  position: fixed;
  right: 20px;
  bottom: 20px;

  a {
    text-decoration: none;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
`;

const Second = () => {
  return (
    <HeaderContainer>
      <HeadTopContainer>
        <div className="head-bar"></div>
        <HeadLogoContainer>
          <HeadLogo>
            <a href="/">
              <img src={logo} />
              <p id="title">COUNTINGBELL</p>
            </a>
          </HeadLogo>
        </HeadLogoContainer>
      </HeadTopContainer>
      <ScrollToTop id="top">
        <a href="#">Top</a>
      </ScrollToTop>
    </HeaderContainer>
  );
};

export default Second;
