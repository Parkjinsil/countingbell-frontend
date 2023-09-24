import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import image1 from "../assets/111.jpg";
import image2 from "../assets/222.jpg";
import image3 from "../assets/333.jpg";
import image4 from "../assets/444.jpg";
import image5 from "../assets/555.jpg";

const Main = styled.main`
  padding-top: 100px;
  width: 100vw;
`;

const HeadMenu = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 50px;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  background-color: #f8cdc1;

  ul {
    display: inline-block;
  }

  li {
    display: inline-block;

    a {
      text-decoration: none;
      color: #ff5e33;
    }
  }

  span {
    font-family: "omyu_pretty";
    font-size: 1.5rem;
    padding: 0 30px;
  }

  input {
    border: none;
    background-color: #fcf1f1;
    padding: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .search-btn {
    display: flex;
  }

  i {
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
    color: #666;
  }

  button {
    background: #e2d5d5;
    border: none;
    cursor: pointer;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Section = styled.div`
  height: calc(100vh - 218px);
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  overflow: hidden;
  gap: 10px;

  img {
    width: 100%;
    max-width: 800px;
    height: 450px;
    border-radius: 10%;
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 200px;
  background-color: #f8cdc1;
  gap: 120px;

  .category-content {
    position: relative;
  }

  .category-link {
    text-decoration: none;
    color: white;
    font-family: "omyu_pretty";
    font-size: 2rem;
    font-weight: bold;
    position: relative;
  }

  .category-image {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    display: block;
  }

  .category-text {
    display: block;
    text-align: center;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 3px 3px 4px black;
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

const Home = () => {
  return (
    <Main>
      <div class="head-bottom-container">
        <HeadMenu>
          <nav>
            <ul>
              <li>
                <a href="#">
                  <span>카테고리</span>
                </a>
              </li>
              <li>
                <a href="#section1">
                  <span>온라인 줄서기</span>
                </a>
              </li>
              <li>
                <a href="#">
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
                <a href="#">
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
                  <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </HeadMenu>
      </div>

      <Section class="mainpage">
        <Slide id="slide">
          <img src={image1} alt="image1" />
          <img src={image2} alt="image2" />
          <img src={image3} alt="image3" />
          <div className="slide-btn-container">
            <button type="button" className="slide-btn"></button>
            <button type="button" className="slide-btn"></button>
            <button type="button" className="slide-btn active"></button>
            <button type="button" className="slide-btn"></button>
            <button type="button" className="slide-btn"></button>
          </div>
        </Slide>

        <Category id="category">
          <a href="#section1" className="category-link">
            <img src={image4} alt="위치별" className="category-image" />
            <span className="category-text">내위치</span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img src={image5} alt="인기순" className="category-image" />
              <span className="category-text">인기순</span>
            </span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img src={image4} alt="음식별" className="category-image" />
              <span className="category-text">음식별</span>
            </span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img src={image5} alt="리뷰순" className="category-image" />
              <span className="category-text">리뷰순</span>
            </span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img src={image3} alt="기타" className="category-image" />
              <span className="category-text">기타</span>
            </span>
          </a>
        </Category>
      </Section>

      <ScrollToTop id="top">
        <a href="#">Top</a>
      </ScrollToTop>
    </Main>
  );
};
export default Home;
