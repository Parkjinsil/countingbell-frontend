import React from "react";
import styled from "styled-components";

import image11 from "../assets/111.png";
import image22 from "../assets/mypage.img/image.ring.jpg";
import image33 from "../assets/mypage.img/image.setting.jpg";
import image44 from "../assets/mypage.img/image (1).png";
import image55 from "../assets/mypage.img/images1.png";
import image66 from "../assets/mypage.img/image2.jpg";
import image77 from "../assets/mypage.img/image3.jpg";
import image88 from "../assets/mypage.img/image4.jpg";
import image99 from "../assets/mypage.img/image5.jpg";
import image100 from "../assets/mypage.img/image6.jpg";

const Wrap = styled.div`
  text-align: center;
`;

const WrapCenter = styled.div`
  display: inline-block;
  width: 700px;
  margin-bottom: 30px;
`;

const MyPageHeader = styled.div`
  display: flex;
  height: 90px;
  position: relative;
  padding-top: 15px;

  div {
    display: flex;
  }
  .myheader img {
    width: 80px;
    height: 75px;
  }
  span {
    height: 65px;
    color: #ff5e33;
    font-size: 27px;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
  }
`;

const MyPageRight = styled.div`
  position: absolute;
  right: 0;

  img {
    width: 50px;
    height: 50px;
    margin-left: 5px;
    margin-top: 10px;
  }
`;

const MyPageBodyHeader = styled.div`
  height: 200px;
  display: flex;
  padding: 0 20px;
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
  align-items: center;
  position: relative;

  img {
    width: 100px;
    height: 100px;
    display: flex;
  }
  div {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  span {
    font-size: 20px;
    margin-left: 5px;
  }
  a {
    text-decoration: none;
    position: absolute;
    right: 44px;
    border: 1px solid rgb(139, 139, 139);
    border-radius: 15px;
    padding: 13px;
    font-size: 15px;
    color: rgb(139, 139, 139);
  }
  a:visited {
    color: rgb(139, 139, 139);
  }
  a:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
  }
`;
const MyPageState = styled.div`
  margin-top: 30px;
  height: 100px;
  background-color: rgb(240, 240, 240);
  border-radius: 10px;

  span {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
  }
`;

const MyPageGrid = styled.div`
  height: 350px;
  display: grid;
  grid-gap: 30px;
  justify-content: center;
  align-items: center;
  grid-template-rows: repeat(1fr, 1fr);
  grid-template-columns: repeat(3, 1fr);
  padding-top: 30px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    /* border: 1px solid#ff5e33; */
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.12);
    border-radius: 10px;
  }
  a img {
    width: 100px;
    height: 50px;
    padding-bottom: 10px;
  }
  a span {
    font-size: 17px;
    padding-bottom: 5px;
  }
  a:visited {
    color: black;
  }
  a:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
  }
`;

const MyPage = () => {
  const image1 = image11;
  const image2 = image22;
  const image3 = image33;
  const image4 = image44;
  const image5 = image55;
  const image6 = image66;
  const image7 = image77;
  const image8 = image88;
  const image9 = image99;
  const image10 = image100;

  return (
    <Wrap id="wrap">
      <WrapCenter id="wrap-center">
        <MyPageHeader id="mypage-header">
          <div className="my-header">
            <img src={image1} alt="" />
            <span>MY카벨</span>
          </div>
          <MyPageRight class="right">
            <a href="#">
              <img src={image2} alt="" />
            </a>
            <a href="">
              <img src={image3} alt="" />
            </a>
          </MyPageRight>
        </MyPageHeader>
        <div id="mypage-body">
          <MyPageBodyHeader id="mypage-body-header">
            <img src={image4} alt="" />
            <div>
              <span>최준혁</span>
            </div>
            <a href="#">프로필 수정</a>
          </MyPageBodyHeader>
          <MyPageState id="mypage-body-state">
            <span>
              내 앞 대기 <span>8</span>팀
            </span>
          </MyPageState>
          <MyPageGrid id="mypage-body-grid">
            <a href="">
              <img src={image5} alt="" />
              <span>예약내역</span>
            </a>
            <a href="">
              <img src={image6} alt="" />
              <span>줄서기</span>
            </a>
            <a href="">
              <img src={image7} alt="" />
              <span>리뷰관리</span>
            </a>
            <a href="">
              <img src={image8} alt="" />
              <span>포인트 </span>
              <span>14원</span>
            </a>
            <a href="">
              <img src={image9} alt="" />
              <span>쿠폰함 </span>
              <span>3장</span>
            </a>
            <a href="">
              <img src={image10} alt="" />
              <span>찜</span>
            </a>
          </MyPageGrid>
        </div>
      </WrapCenter>
    </Wrap>
  );
};

export default MyPage;
