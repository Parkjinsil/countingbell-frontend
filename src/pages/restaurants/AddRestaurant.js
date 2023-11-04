import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddRestaurant } from "../../store/restaurantSlice";
import { asyncGetLocations } from "../../store/locationSlice";
import { asyncGetFoods } from "../../store/foodSlice";
import { useParams } from "react-router-dom";

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
  height: 900px;
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

  const { id } = useParams();

  const [resPicture, setPicture] = useState(null);

  const locations = useSelector((state) => state.location.locationList);
  const foods = useSelector((state) => state.food.foodList);

  useEffect(() => {
    dispatch(asyncGetLocations(1));
    dispatch(asyncGetFoods(1));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    resName: "",
    resAddr: "",
    resPhone: "",
    resOpenHour: "",
    resClose: "",
    resDesc: "",
    localCode: "",
    foodCode: "1",
    id: "",
    resPicks: "",
  });

  const {
    resName,
    resAddr,
    resPhone,
    resOpenHour,
    resClose,
    resDesc,
    localCode,
    foodCode,
    resPicks,
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

    const data = new FormData();
    data.append("resName", formData.resName);
    data.append("resAddr", formData.resAddr);
    data.append("resPhone", formData.resPhone);
    data.append("resOpenHour", formData.resOpenHour);
    data.append("resClose", formData.resClose);
    data.append("resDesc", formData.resDesc);
    data.append("localCode", formData.localCode);
    data.append("foodCode", formData.foodCode);
    data.append("id", id);
    data.append("resPicks", formData.resPicks);

    if (resPicture) {
      data.append("resPicture", resPicture);
    }

    dispatch(asyncAddRestaurant(data));
    navigate("/");
  };

  return (
    <Container>
      <form
        className="addRestaurantForm"
        onSubmit={addRestaurantHandler}
        style={{ paddingTop: "320px" }}
      >
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
              <p>식당 오픈 시간</p>
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

            <div>
              <div className="localCode">
                <p>지역</p>
                <label>
                  <select id="localCode" value={localCode} onChange={onChange}>
                    <option value="">지역</option>
                    {locations
                      .slice()
                      .reverse()
                      .map((location, index) => (
                        <option key={index} value={location.localCode}>
                          {location.localName}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            </div>
            <div>
              <div className="foodCode">
                <p>음식 종류</p>
                <label>
                  <select id="foodCode" value={foodCode} onChange={onChange}>
                    <option value="">음식 종류</option>
                    {foods
                      .slice()
                      .reverse()
                      .map((food, index) => (
                        <option key={index} value={food.foodCode}>
                          {food.foodType}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="id">
              <p>찜 관리</p>
              <label>
                <input
                  id="resPicks"
                  value={resPicks}
                  type="text"
                  placeholder="0을 입력해주세요."
                  onChange={onChange}
                  required
                ></input>
              </label>
              <div className="resPicksError"></div>
            </div>

            <div className="resPicture">
              <p>식당 메인 사진</p>
              <label>
                <input
                  id="resPicture"
                  type="file"
                  placeholder="메뉴 사진을 등록 해주세요."
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                  }}
                  multiple
                  required
                ></input>
              </label>
              <div className="resPictureError"></div>
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
