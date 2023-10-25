import { useEffect, useState } from "react";
import styled from "styled-components";
import { addRestaurant } from "../../api/restaurant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddRestaurant } from "../../store/restaurantSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: azure;
  padding-top: 100px;
`;

const Wrapper = styled.div`
  display: block;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* max-width: 700px; */
  width: 100%;
  height: 830px;
`;

const Title = styled.div`
  text-align: center;

  font-size: 2.5rem;
  /* background-color: aqua; */

  padding: 10px;
`;

const InputContainer = styled.div`
  display: block;
  justify-content: center;
  width: 400px;

  div {
    padding: 3px 0;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
    font-weight: bold;
    /* font-family: "omyu_pretty"; */
  }

  input,
  select {
    width: 100%;
    padding: 5px;
  }

  label {
    display: flex;
    gap: 5px;
    background-color: aliceblue;
    width: 100%;

    #gender {
      width: 100%;
      padding: 7px;
    }
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  margin: 10px 0;
  padding: 10px;

  button {
    width: 100%;
    padding: 10px;

    border: none;
    cursor: pointer;
    background-color: #f8cdc1;
    /* font-family: "omyu_pretty"; */
    font-size: 1.5rem;

    &:hover {
      background-color: #ff5e33;
      color: #fff;
    }
  }
`;

const AddRestaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    resName: "",
    resAddr: "",
    resPhone: "",
    resOpenHour: "",
    resClose: "",
    resDesc: "",
    resPicture: "",
    resPicks: "",
    localCode: "",
    foodCode: "",
    id: "",
  });

  const {
    resName,
    resAddr,
    resPhone,
    resOpenHour,
    resClose,
    resDesc,
    resPicture,
    localCode,
    foodCode,
    id,
  } = formData;

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const addRestaurantHandler = async (e) => {
    e.preventDefault();

    dispatch(asyncAddRestaurant(formData));
    navigate("/");
  };

  return (
    <Container>
      <form className="addRestaurantForm" onSubmit={addRestaurantHandler}>
        <Wrapper>
          <Title>
            <h1>식당 등록</h1>
          </Title>
          <InputContainer>
            <div className="id">
              <p>식당 이름</p>
              <label>
                <input
                  id="resName"
                  value={resName}
                  type="text"
                  placeholder="식당이름을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resNameError"></div>
            </div>

            <div className="resAddr">
              <p>식당 주소</p>
              <label>
                <input
                  id="resAddr"
                  value={resAddr}
                  type="text"
                  placeholder="식당주소를 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resAddrError"></div>
            </div>

            <div className="resPhone">
              <p>식당 전화번호</p>
              <label>
                <input
                  id="resPhone"
                  value={resPhone}
                  type="text"
                  placeholder="식당 전화번호를 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resPhoneError"></div>
            </div>

            <div className="resOpenHour">
              <p>식당 영업시간</p>
              <label>
                <input
                  id="resOpenHour"
                  value={resOpenHour}
                  type="text"
                  placeholder="영업시간을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resOpenHourError"></div>
            </div>

            <div className="resClose">
              <p>식당 닫는 시간</p>
              <label>
                <input
                  id="resClose"
                  value={resClose}
                  type="text"
                  placeholder="닫는 시간을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resCloseError"></div>
            </div>

            <div className="resDesc">
              <p>식당 설명</p>
              <label>
                <input
                  id="resDesc"
                  value={resDesc}
                  type="text"
                  placeholder="식당 설명을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resDescError"></div>
            </div>

            <div className="resPicture">
              <p>식당 메인 사진</p>
              <label>
                <input
                  id="resPicture"
                  value={resPicture}
                  type="file"
                  placeholder="메뉴 사진을 등록 해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resDescError"></div>
            </div>

            <div>
              <div className="localCode">
                <p>지역</p>
                <label>
                  <select id="localCode" value={localCode} onChange={onChange}>
                    <option>지역</option>
                    <option value="1">압구정/청담</option>
                    <option value="2">이태원/한남</option>
                    <option value="3">부산</option>
                    <option value="4">성수</option>
                    <option value="5">광화문/종로</option>
                    <option value="6">강남/역삼</option>
                    <option value="7">합정/망원</option>
                    <option value="8">홍대/신촌</option>
                    <option value="9">여의도</option>
                    <option value="10">북촌/삼청</option>
                    <option value="11">을지로</option>
                    <option value="12">제주</option>
                    <option value="13">대구</option>
                  </select>
                </label>
              </div>
            </div>
            <div>
              <div className="foodCode">
                <p>음식 종류</p>
                <label>
                  <select id="foodCode" value={foodCode} onChange={onChange}>
                    <option value="1">한식</option>
                    <option value="2">일식</option>
                    <option value="3">중식</option>
                    <option value="4">양식</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="id">
              <p>아이디</p>
              <label>
                <input
                  id="id"
                  value={id}
                  type="text"
                  placeholder="본인 아이디를 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="idError"></div>
            </div>
          </InputContainer>
        </Wrapper>
        <BtnArea>
          <button type="submit">
            <span>등록하기</span>
          </button>
        </BtnArea>
      </form>
    </Container>
  );
};

export default AddRestaurant;
