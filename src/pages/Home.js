import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import image1 from "../assets/111.jpg";
import image2 from "../assets/222.jpg";
import image3 from "../assets/333.jpg";
import image4 from "../assets/444.jpg";
import image5 from "../assets/555.jpg";

const Main = styled.main`
  background-color: white;
`;

const Section = styled.section`
  &.mainpage {
    height: calc(100vh - 168px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
  }

  &.section1 {
    background-color: rgb(238, 200, 200);
    height: calc(100vh - 117px);
  }
`;

const SliderContainer = styled.div`
  /* display: flex;
  justify-content: center;
  width: 100vw;
  overflow: hidden;
  gap: 10px;
  position: relative;

  img {
    max-width: 100%;
    height: 500px;
    border-radius: 10%;
    display: block;
  } */

  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;

  .slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
    gap: 10px;
    width: 100vw;
  }

  .slides img {
    /* width: 100%; */
    height: 500px;
    border-radius: 10%;
    display: block;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 270px;
  transform: translateX(-100%);

  .slide-btn {
    border: none;
    padding: 7px;
    background-color: #f8cdc1;
    border-radius: 50%;
    margin: 2px;

    &:hover {
      background-color: #ff5e33;
      color: white;
    }

    &.active {
      background-color: #ff5e33;
      color: white;
    }
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
  const images = [image1, image2, image3, image4, image5];
  const buttons = [0, 1, 2, 3, 4];
  const [currentSlide, setCurrentSlide] = useState(2);

  const onClick = (index) => {
    // setCurrentSlide(index);
    if (index < 0) {
      setCurrentSlide(images.length - 1);
    } else if (index >= images.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  return (
    <Main>
      <Section className="mainpage">
        <SliderContainer>
          <div className="slider">
            <div
              className="slides"
              style={{ transform: `translateX(-${currentSlide * 50}%)` }}
            >
              {/* <img src={image1} alt="image1" />
              <img src={image2} alt="image2" />
              <img src={image3} alt="image3" />
              <img src={image4} alt="image4" />
              <img src={image5} alt="image5" /> */}
              {[images[images.length - 1], ...images, images[0], images[1]].map(
                (image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`image${(index % images.length) + 1}`}
                    className="slide"
                  />
                )
              )}
            </div>
          </div>
        </SliderContainer>

        <ButtonContainer>
          {buttons.map((index) => (
            <button
              key={index}
              type="button"
              className={`slide-btn ${currentSlide === index ? "active" : ""}`}
              onClick={() => onClick(index)}
            ></button>
          ))}
        </ButtonContainer>

        <Category id="category">
          <a href="/restaurantList" className="category-link">
            <img src={image4} alt="위치별" className="category-image" />
            <span className="category-text">내위치</span>
          </a>
          <a href="/restaurantList" className="category-link">
            <span className="category-content">
              <img src={image5} alt="인기순" className="category-image" />
              <span className="category-text">인기순</span>
            </span>
          </a>
          <a href="/restaurantList" className="category-link">
            <span className="category-content">
              <img src={image4} alt="음식별" className="category-image" />
              <span className="category-text">음식별</span>
            </span>
          </a>
          <a href="/restaurantList" className="category-link">
            <span className="category-content">
              <img src={image5} alt="리뷰순" className="category-image" />
              <span className="category-text">리뷰순</span>
            </span>
          </a>
          <a href="/restaurantList" className="category-link">
            <span className="category-content">
              <img src={image3} alt="기타" className="category-image" />
              <span className="category-text">기타</span>
            </span>
          </a>
        </Category>
      </Section>

      <Section className="section1">
        <h2>section1</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
          libero minima! Placeat fuga quibusdam culpa a modi? Perspiciatis,
          dolores libero ipsa dignissimos voluptas, magni eos id minima, ut
          doloribus necessitatibus?
        </p>
      </Section>

      <ScrollToTop id="top">
        <a href="#">Top</a>
      </ScrollToTop>
    </Main>
  );
};
export default Home;
