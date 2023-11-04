import React, { useState } from "react";
import logo from "../assets/LOGO.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSave, userLogout } from "../store/userSlice";
import { asyncSearchResByMenuName } from "../store/restaurantSlice";
import "bootstrap/dist/css/bootstrap.min.css";

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

  @media screen and (max-width: 1200px) {
    display: none;
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
      color: #ff5e33;
      padding: 10px;
      border-radius: 5px;
      line-height: 50px;
      background-color:transparent;

      &:hover {
        background-color: #ff5e33;
        color: white;
        line-height: 50px;
      }

      span {
        font-family: "omyu_pretty";
        font-size: 1.6rem;
        padding: 0 30px;
      }
    }

    .search-btn {
      display: flex;
      align-items: center;

      #search {
        border: none;
        background-color: #fcf1f1;
        padding-right: 10px;
        padding-left: 7px;
        width: 600px;
      }

      #select {
        border: none;
        background-color: #fcf1f1;
        padding: 10px;
        padding-right: 15px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-right: 1px solid #666; /* 오른쪽에 경계선 추가 */
      }

      button {
        background: #e2d5d5;
        border: none;
        cursor: pointer;
        padding-right: 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;

        #icon {
          font-size: 25px;
          cursor: pointer;
          color: #666;
        }
      }
    }
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

  @media screen and (max-width: 1500px) {
    display: none;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [keyword, setKeyword] = useState("");

  const user = useSelector((state) => {
    return state.user;
  });

  // 검색 필터
  const [filter, setFilter] = useState("resName");

  // 검색 필터 선택 시 필터값 처리하는 함수
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = () => {
    // console.log("keyword값 보내지나? : " + keyword);
    // navigate(`/resSearch/${keyword}`);
    if (keyword) {
      if (filter === "resName") {
        navigate(`/searchByResName/${keyword}`);
      } else if (filter === "menuName") {
        navigate(`/resSearch/${keyword}`);
      }
    }
  };

  // 로그인 유지
  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  // 로그아웃
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
                  <span>최근본식당</span>
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
                <>
                  <li>
                    <Link to="/userPicksList/${user.id}/picks">
                      <span>찜한식당</span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout}>
                      <span>로그아웃</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </HeadRight>
        </HeadLogoContainer>
      </HeadTopContainer>
      <HeadMenu>
        <nav>
          <li>
            <div className="search-btn">
              <select
                className="select"
                id="select"
                onChange={handleFilterChange}
              >
                <option value="resName" defaultValue>
                  식당별
                </option>
                <option value="menuName">메뉴별</option>
              </select>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              <button type="button" onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} id="icon" />
              </button>
            </div>
          </li>
          <ul>
            <li>
              <a href="reservation">
                <span>빠른예약</span>
              </a>
            </li>
            <li>
              <Link to={`discountboard`}>
                <span>할인정보</span>
              </Link>
            </li>
            <li>
              <Link to={`myPage/${user.id}`}>
                <span>마이페이지</span>
              </Link>
            </li>
          </ul>
        </nav>
      </HeadMenu>
      <ScrollToTop id="top">
        <a href="#">Top</a>
      </ScrollToTop>
    </HeaderContainer>
  );
};

export default Header;
