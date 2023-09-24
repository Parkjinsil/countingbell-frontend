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

const HeadRight = styled.div`
  position: absolute;
  right: 0;
  margin-right: 50px;
  line-height: 80px;
  overflow: hidden;
  white-space: nowrap;

  li {
    display: inline-block;
    font-family: "omyu_pretty";
    font-size: 20px;
    line-height: 35px;
    padding: 0 10px;

    a {
      text-decoration: none;
      color: #ff5e33;

      &:hover {
        color: #ff5e33;
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeadTopContainer>
        <div className="head-bar"></div>
        <HeadLogoContainer>
          <HeadLogo>
            <a href="#">
              <img src={logo} />
              <p id="title">COUNTINGBELL</p>
            </a>
          </HeadLogo>
          <HeadRight>
            <nav>
              <ul>
                <li>
                  <a href="#section1">
                    <span>최근본가게</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>로그인</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>회원가입</span>
                  </a>
                </li>
              </ul>
            </nav>
          </HeadRight>
        </HeadLogoContainer>
      </HeadTopContainer>
    </HeaderContainer>
  );
};

export default Header;
