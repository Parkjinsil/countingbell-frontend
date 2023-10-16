import React from "react";
import logo from "../assets/LOGO.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSave, userLogout } from "../store/userSlice";

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
  margin-right: 70px;
  line-height: 80px;
  overflow: hidden;
  white-space: nowrap;

  li {
    display: inline-block;
    font-family: "omyu_pretty";
    font-size: 20px;
    line-height: 35px;
    padding: 0 15px;

    a {
      text-decoration: none;
      color: rgb(255, 94, 51, 0.7);

      &:hover {
        color: #ff5e33;
      }
    }

    button {
      border: none;
      color: rgb(255, 94, 51, 0.7);
      background-color: white;

      &:hover {
        color: #ff5e33;
      }
    }
  }
`;

const HeadMenu = styled.div`
  padding-top: 100px;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 50px;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  background-color: #f8cdc1;
  transition: transform 0.3s;

  /* &.hidden {
    transform: translateY(-100%);
  } */

  ul {
    display: inline-block;
    height: 50px;
  }

  li {
    display: inline-block;
    align-items: center;
    padding: 0 30px;
    line-height: 40px;

    a {
      text-decoration: none;
      color: #ff5e33;
      padding: 10px;
      border-radius: 5px;

      &:hover {
        background-color: #ff5e33;
        color: white;
        line-height: 50px;
      }

      span {
        font-family: "omyu_pretty";
        font-size: 1.5rem;
        padding: 0 30px;
      }
    }

    .search-btn {
      display: flex;
      align-items: center;
      padding: 5px;

      #search {
        border: none;
        background-color: #fcf1f1;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      button {
        background: #e2d5d5;
        border: none;
        cursor: pointer;
        font-size: 15px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;

        #icon {
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }
      }
    }
  }
`;

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  const logout = () => {
    console.log("logout!");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
  };

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
          <HeadRight>
            <ul>
              <li>
                <Link to="recentList">
                  <span>최근본가게</span>
                </Link>
              </li>

              {Object.keys(user).length === 0 ? (
                <>
                  <li>
                    <Link to="login">
                      <span>로그인</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="signup">
                      <span>회원가입</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={logout}>로그아웃</button>
                </li>
              )}
            </ul>
          </HeadRight>
        </HeadLogoContainer>
      </HeadTopContainer>
      <HeadMenu>
        <nav>
          <ul>
            <li>
              <a href="#">
                <span>카테고리</span>
              </a>
            </li>
            <li>
              <a href="waiting">
                <span>온라인 줄서기</span>
              </a>
            </li>
            <li>
              <a href="reservation">
                <span>빠른예약</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>EVENT</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>고객센터</span>
              </a>
            </li>
            <li>
              <a href="myPage">
                <span>마이페이지</span>
              </a>
            </li>
            <li>
              <div className="search-btn">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="검색"
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} id="icon" />
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </HeadMenu>
    </HeaderContainer>
  );
};

export default Header;
