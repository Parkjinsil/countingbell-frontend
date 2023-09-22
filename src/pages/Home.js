import React from "react";
import styled from "styled-components";

import image1 from "../assets/111.jpg";
import image2 from "../assets/222.jpg";
import image3 from "../assets/333.jpg";
import image4 from "../assets/444.jpg";
import image5 from "../assets/555.jpg";

const Home = () => {
  return (
    <main>
      <div className="head-bottom-container">
        <div className="head-menu">
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
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <section className="mainpage">
        <div className="slide" id="slide">
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
        </div>

        <div id="category">
          <a href="#section1" className="category-link">
            <img
              src="./resources/city.jpg"
              alt="위치별"
              className="category-image"
            />
            <span className="category-text">내 위치</span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img
                src="./resources/image_pork.jpg"
                alt="인기순"
                className="category-image"
              />
              <span className="category-text">인기순</span>
            </span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img
                src="./resources/image_pizza.jpg"
                alt="음식별"
                className="category-image"
              />
              <span className="category-text">음식별</span>
            </span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img
                src={"./resources/cake.jpg"}
                alt="리뷰순"
                className="category-image"
              />
              <span className="category-text">리뷰순</span>
            </span>
          </a>
          <a href="#" className="category-link">
            <span className="category-content">
              <img
                src="./resources/image_pasta.PNG"
                alt="기타"
                className="category-image"
              />
              <span className="category-text">기타</span>
            </span>
          </a>
        </div>
      </section>
      <section id="section1">
        <h2>section1</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
          libero minima! Placeat fuga quibusdam culpa a modi? Perspiciatis,
          dolores libero ipsa dignissimos voluptas, magni eos id minima, ut
          doloribus necessitatibus?
        </p>
      </section>
      <section id="section2">
        <h2>section2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
          libero minima! Placeat fuga quibusdam culpa a modi? Perspiciatis,
          dolores libero ipsa dignissimos voluptas, magni eos id minima, ut
          doloribus necessitatibus?
        </p>
      </section>
      <div id="top">
        <a href="#">TOP</a>
      </div>
    </main>
  );
};
export default Home;
