import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddReser } from "../../store/reserSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { userSave } from "../../store/userSlice";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const Reser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("reserPer", e.target.reserPer.value);
    formData.append("resCode", resCode);
    formData.append("reserTime", e.target.reserTime.value);
    formData.append("reserDate", e.target.reserDate.value);
    formData.append("id", user.id);

    // FormData를 URL 쿼리 매개변수로 인코딩
    const queryParams = new URLSearchParams(formData);

    // 들어간 key 값 확인
    for (let key of formData.keys()) {
      console.log(key);
    }
    // 들어간 value 값 확인
    for (let value of formData.values()) {
      console.log(value);
    }

    dispatch(asyncAddReser(formData))
      .then(() => {
        // 예약 등록 성공하면 예약 성공 페이지로 이동
        // 이동하면서 URL 쿼리 매개변수를 전달
        navigate(`/reservationCom?${queryParams.toString()}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Container style={{paddingTop: "90px"}}>
      <H1>예약 하기</H1>
      <Form onSubmit={handleSubmit} style={{width: "100%",
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center"}}>
        <Form.Group className="mb-3" style={{width:"300px"}}>
          <Form.Control type="text" placeholder="인원 수" name="reserPer" />
        </Form.Group>
        <Form.Group className="mb-3" style={{width:"300px"}}>
          <Form.Control type="date" placeholder="날짜" name="reserDate" />
        </Form.Group>
        <Form.Group className="mb-3" style={{width:"300px"}}>
          <Form.Control type="time" placeholder="시간" name="reserTime" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="submit" value="예약 하기" />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Reser;
