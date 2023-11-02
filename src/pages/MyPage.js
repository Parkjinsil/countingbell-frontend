import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncShowMember, userSave } from "../store/userSlice";
const Wrap = styled.div`
  text-align: center;
  margin-top: 100px;
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

  button {
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
  button img {
    width: 100px;
    height: 100px;
    padding-bottom: 10px;
  }
  button span {
    font-size: 17px;
    padding-bottom: 5px;
  }
  button:visited {
    color: black;
  }
  button:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
  }
`;

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1명정보 불러오기
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  console.log("유저 role : " + user.role);

  useEffect(() => {
    dispatch(asyncShowMember(id));
  }, []);

  const onMyRes = () => {
    navigate(`/resIdBoard/${id}`);
  };

  const onReserList = () => {
    navigate(`/ReserList/${id}`);
  };

  const onReviewList = () => {
    navigate(`/ReviewList/${id}`);
  };

  // 내찜목록
  const onMyPicks = () => {
    console.log("id 어떻게 보내지? : " + id);
    navigate(`/userPicksList/${user.id}/picks`);
  };

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  return (
    <Wrap id="wrap">
      <WrapCenter id="wrap-center">
        <MyPageHeader id="mypage-header">
          <div className="my-header">
            <img src={image11} alt="" />
            <span>MY카벨</span>
          </div>
          <MyPageRight className="right">
            <a href="#">
              <img src={image22} alt="" />
            </a>
            <a href="">
              <img src={image33} alt="" />
            </a>
          </MyPageRight>
        </MyPageHeader>
        <div id="mypage-body">
          <MyPageBodyHeader id="mypage-body-header">
            <img src={image44} alt="" />
            <div>
              <span>{user.name}</span>
            </div>
            <div>
              <Link to={`/memberUpdate/${user.id}`}>프로필 수정</Link>
            </div>
          </MyPageBodyHeader>
          <MyPageState id="mypage-body-state">
            <span>
              내 앞 대기 <span>8</span>팀
            </span>
          </MyPageState>
          <MyPageGrid id="mypage-body-grid">
            {user.role === "사장" || user.role === "관리자" ? (
              <>
                <button onClick={onMyRes}>
                  <img src={image55} alt="" />
                  <span>내 식당 관리</span>
                </button>
                <button>
                  <img src={image66} alt="" />
                  <span>예약 관리</span>
                </button>
                <button>
                  <img src={image77} alt="" />
                  <span>리뷰 관리</span>
                </button>
                <button>
                  <img src={image100} alt="" />
                  <span>찜 관리</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={onReserList}>
                  <img src={image55} alt="" />
                  <span>예약내역</span>
                </button>
                <button onClick={onReviewList}>
                  <img src={image77} alt="" />
                  <span>리뷰관리</span>
                </button>
                <button onClick={onMyPicks}>
                  <img src={image100} alt="" />
                  <span>찜관리</span>
                </button>
              </>
            )}
          </MyPageGrid>
        </div>
      </WrapCenter>
    </Wrap>
  );
};
export default MyPage;
