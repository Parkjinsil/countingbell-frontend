import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  asyncAddDiscount,
  asyncViewDiscount,
  asyncUpdateDiscount,
  asyncDeleteDiscount,
} from "../store/discountSlice";

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 50px 20px 20px 20px;
`;

const Discount = () => {
  const dispatch = useDispatch();
  const [disDesc, setDisDesc] = useState(""); // 할인설명 상태
  const [disPeriod, setDisPeriod] = useState(""); // 할인기간 상태
  const [resCode, setResCode] = useState(""); // 식당코드 상태
  const [disCode, setDisCode] = useState(""); // 할인코드 상태

  const onAddDiscount = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("disDesc", disDesc);
    formData.append("disPeriod", disPeriod);
    formData.append("resCode", resCode);

    dispatch(asyncAddDiscount(formData));
  };

  const onSearchDiscount = (e) => {
    e.preventDefault();
    dispatch(asyncViewDiscount(disCode));
  };

  const onUpdateDiscount = (e) => {
    e.preventDefault();
    dispatch(
      asyncUpdateDiscount({
        disCode: disCode,
        disDesc: disDesc,
        disPeriod: disPeriod,
      })
    );
  };

  const onCancelDiscount = (e) => {
    e.preventDefault();
    dispatch(asyncDeleteDiscount(disCode));
  };

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <Container>
          <H1>할인</H1>
          <Form
            onSubmit={onAddDiscount}
            style={{ width: "600px", margin: "0 auto" }}
          >
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="할인설명 : 할인등록, 할인수정시 작성해주세요."
                name="disDesc"
                value={disDesc}
                onChange={(e) => setDisDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="할인기간 : 할인등록, 할인수정시 작성해주세요."
                name="disPeriod"
                value={disPeriod}
                onChange={(e) => setDisPeriod(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="식당코드 : 할인등록시 작성해주세요."
                name="resCode"
                value={resCode}
                onChange={(e) => setResCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="할인코드 : 할인조회, 할인수정, 할인삭제시 작성해주세요."
                name="disCode"
                value={disCode}
                onChange={(e) => setDisCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <span className="btn1" style={{ paddingRight: "25px" }}>
                <button type="submit" className="btn btn-primary">
                  할인등록
                </button>
              </span>
              <span className="btn3" style={{ paddingRight: "25px" }}>
                <button
                  type="button"
                  className="btn btn-primary 1"
                  onClick={onSearchDiscount}
                >
                  할인조회
                </button>
              </span>
              <span className="btn4" style={{ paddingRight: "25px" }}>
                <button
                  type="button"
                  className="btn btn-primary 2"
                  onClick={onUpdateDiscount}
                >
                  할인수정
                </button>
              </span>
              <span className="btn5">
                <button
                  type="button"
                  className="btn btn-primary 3"
                  onClick={onCancelDiscount}
                >
                  할인삭제
                </button>
              </span>
            </Form.Group>
          </Form>
        </Container>
        <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5"></div>
      </div>
    </div>
  );
};

export default Discount;
