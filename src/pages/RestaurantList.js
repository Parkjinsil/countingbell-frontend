import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import image11 from "../assets/111.png";

const Wrap = styled.div`
  text-align: center;
`;

const List = styled.div`
  display: inline-block;
  width: 1270px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.5px solid #ffac95;
  margin-bottom: 10px;

  img {
    width: 80px;
    height: 75px;
    margin: 0 20px;
  }
  div {
    height: 65px;
    color: #ff5e33;
    font-size: 22px;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ListBody = styled.div`
  width: 1270px;
  display: flex;
  justify-content: center;

  li {
    width: 468px;
    height: 200px;
    margin-bottom: 25px;
    list-style-type: none;
    border-radius: 10px;
  }
  li {
    border: 2px solid white;
  }
  li:hover {
    border: 2px solid #ffae96;
  }
  li:last-child {
    margin-bottom: 10px;
  }
  a {
    display: flex;
    justify-content: center;
    text-decoration: none;
  }
  a:visited {
    color: black;
  }
  li img {
    width: 214px;
    height: 185px;
    border-radius: 15px;
    margin: 8px 0 0 8px;
  }
`;

const ListDesc = styled.div`
  width: 250px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 20px 0;
  border: 0px solid white;

  span:first-child {
    height: 25px;
  }
  div {
    display: flex;
  }
  div img {
    margin-left: -5px;
    margin-top: 2px;
    width: 20px;
  }
  div span {
    width: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    font-weight: 410;
    font-size: 19px;
  }
  .restaurant-name {
    font-weight: 530;
    font-size: 23px;
    align-items: center;
  }
  .last-line,
  .dot {
    padding-top: 4px;
  }
`;

const ListFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 0 540px;
  height: 36px;
  padding-bottom: 30px;

  div {
    position: relative;
    padding: 20px;
  }
  .prev,
  .next {
    background: none;
    border: none;
    content: "";
    width: 36px;
    height: 36px;
    border: 1px solid #dadcdf;
    background-color: #fff;
    position: relative;
    display: inline-block;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 50%;
    vertical-align: top;
    cursor: pointer;
    margin-top: 3px;
  }
  .prev::before,
  .next::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(/images/sp_main.png);
    background-size: 435px 414px;
    background-position: -35px -402px;
    background-repeat: no-repeat;
    width: 10px;
    height: 12px;
    margin: auto;
  }
  .prev::before {
    transform: rotate(180deg);
  }
  .text {
    display: flex;
    align-items: center;
  }
`;

const RestaurantList = () => {
  const image1 = image11;

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/photo")
      .then((response) => setPhotos(response.data));

    // try {
    //   const response = await axios.get("http://localhost:8080/api/photo");
    //   setRes(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  });

  return (
    <Wrap id="wrap">
      <List className="restaurant-list">
        <ListHeader className="restaurant-list-header">
          <img src={image1} alt="" />
          <div>지역 식당</div>
        </ListHeader>
        <ListBody className="restaurant-list-body">
          <ul>
            {photos.map((photo) => (
              <li key={photo.resPhotoCode}>
                <a href="restaurant">
                  <img src={photo.photoUrl} alt="" />
                  <ListDesc className="restaurant-list-desc">
                    <span className="restaurant-name">{photo.photoName}</span>
                    <div>
                      {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 20px; opacity: 1;"/> */}
                      <span>4.6</span>
                    </div>
                    <span className="last-line">이탈리아 음식</span>
                    <span>강남</span>
                  </ListDesc>
                </a>
              </li>
            ))}
          </ul>
        </ListBody>
        <ListFooter className="restaurant-list-footer">
          <button className="prev"></button>
          <div className="text">
            더보기 1<span className="total">/4</span>
          </div>
          <button className="next"></button>
        </ListFooter>
      </List>
    </Wrap>
  );
};
export default RestaurantList;
