import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddReser } from "../../store/reserSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { userSave } from "../../store/userSlice";

const Wrap = styled.div`
  text-align: center;
`;

const Reserve = styled.div`
  display: inline-block;
  width: 1270px;  
  padding-top: 75px;
`;

const ReserveHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.5px solid #ffac95;
  margin-bottom: 10px;

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

const ButtonOrange = styled.div`
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    text-decoration: none;
    background-color: transparent;
    border: 2px solid #ff5e33;
    border-radius: 10px;
    color: #ff5e33;
  }
  button:visited {
    color: #ff5e33;
  }
  button:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
  }
`

const ReserForm = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;

   div {
    height: 50px;
    display: flex;
    justify-content: flex-end;
    flex-flow: wrap;
    align-content: center;
  }

  select {
    width: 80%;
  }

  input {
    width: 80%;
  }

  .input-div div:nth-of-type(1) {
    display: flex;
    width: 100px;
  }

  .input-div div:nth-of-type(2) {
    width: 200px;
  }
`
const Time = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  div {
  padding-top: 10px;
  }


`


const BtnTime = styled.button`
  width: 100px;
  margin: 10px 10px;
  padding: 10px 0;
  background-color: #ffede9;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    border: 1px solid #ff5e33;
  }

  &:focus {
    filter: brightness(0.9);
  }
`


const Reser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 0-based month
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 한 달 후의 날짜를 가져오는 함수
  const getMaxDate = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 0-based month
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const [formData, setFormData] = useState({
    reserPer: "",
    reserDate: "",
    resCode: "",
    id:""
  });
  
  const [reserTime, setReserTime] = useState("");
  console.log(reserTime);

  // user.id 받아옴
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save !== null) {
      dispatch(userSave(JSON.parse(save)));
    }
  }, []);

  const { resCode } = useParams();

  // 입력값 바뀌면 넣어지게 
  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("reserPer", formData.reserPer);
    data.append("reserDate", formData.reserDate);
    data.append("reserTime", reserTime);
    data.append("resCode", resCode);
    data.append("id", user.id);

    const queryParams = new URLSearchParams(data);

    dispatch(asyncAddReser(data))
      .then(() => {
        navigate(`/reservationCom?${queryParams.toString()}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Wrap id="wrap">
      <Reserve id="reserve">
        <Container>
          <ReserveHeader className="reserve-header">
            <div>
              <span>식당예약</span>
            </div>
          </ReserveHeader>
          <ReserForm>
            <div className="input-div">
              <div><label htmlFor="reserPer">예약 인원 :</label></div>
              <div>
                <select
                  id="reserPer"
                  name="reserPer"
                  value={formData.reserPer}
                  onChange={onChange}
                  required
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
            <div className="input-div">
              <div><label htmlFor="reserDate">날짜 :</label></div>
              <div>
              <input
                type="date"
                id="reserDate"
                name="reserDate"
                value={formData.reserDate}
                onChange={onChange}
                min={getCurrentDate()}
                max={getMaxDate()} 
              />
              </div>
            </div>
          </ReserForm>
          <Time>
          <div className="input-div">
              <div className="buttonTime">
              <div>
              <BtnTime onClick={() => setReserTime("오전 11:00")}>오전 11:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오전 11:30")}>오전 11:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 12:00")}>오전 12:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 12:30")}>오전 12:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 1:00")}>오후 1:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 1:30")}>오후 1:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 2:00")}>오후 2:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 2:30")}>오후 2:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 3:00")}>오후 3:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 3:30")}>오후 3:30</BtnTime>
              </div>
              <div>
              <BtnTime onClick={() => setReserTime("오후 5:00")}>오후 5:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 5:30")}>오후 5:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 6:00")}>오후 6:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 6:30")}>오후 6:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 7:00")}>오후 7:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 7:30")}>오후 7:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 8:00")}>오후 8:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 8:30")}>오후 8:30</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 9:00")}>오후 9:00</BtnTime>
              <BtnTime onClick={() => setReserTime("오후 9:30")}>오후 9:30</BtnTime>
              </div>
              </div>
            </div>
            <div className="input-div">
            <ButtonOrange>
              <button type="button" onClick={handleSubmit}>
                예약하기
              </button>
            </ButtonOrange>
            </div>
          </Time>
        </Container>
      </Reserve>
    </Wrap>
  );
};

export default Reser;
