import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // useSelector를 사용하여 Redux 스토어의 상태를 읽어옵니다.
import {
  asyncAddDiscount,
  asyncViewDiscount,
  asyncUpdateDiscount,
  asyncDeleteDiscount,
} from "../store/discountSlice";

const H1 = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 50px 20px 50px 20px;
`;

const P = styled.p`
  margin-top: 3px;
`;

const Discount = () => {
  const dispatch = useDispatch();
  const [disDesc, setDisDesc] = useState(""); // 할인설명 상태
  const [disPeriod, setDisPeriod] = useState(""); // 할인기간 상태
  const [resCode, setResCode] = useState(""); // 식당코드 상태
  const [disCode, setDisCode] = useState(""); // 할인코드 상태

  //Redux 스토어에서 할인 정보를 선택하고 이를 useState를 사용하여 로컬 상태에 저장
  const discountError = useSelector((state) => state.discount.error);
  const discountSuccess = useSelector((state) => state.discount.success);
  const discountData = useSelector((state) => state.discount.data);

  const resetState = () => {
    return {
      type: "discountSlice/resetState", // 실제 액션 타입과 일치해야 합니다.
    };
  };

  const onAddDiscount = (e) => {
    e.preventDefault();

    dispatch(resetState());

    const formData = new FormData();
    formData.append("disDesc", disDesc);
    formData.append("disPeriod", disPeriod);
    formData.append("resCode", resCode);

    // 할인 추가 액션을 디스패치하기 전에 에러와 성공 상태를 초기화
    dispatch({ type: "discountSlice/asyncAddDiscount/pending" });

    dispatch(asyncAddDiscount(formData));
  };

  const onViewDiscount = async (e) => {
    e.preventDefault();

    // 초기화 액션을 디스패치하여 상태를 초기화
    dispatch(resetState());

    await dispatch(asyncViewDiscount(disCode));
  };

  const onUpdateDiscount = async (e) => {
    e.preventDefault();

    // 초기화 액션을 디스패치하여 상태를 초기화
    dispatch(resetState());

    await dispatch(
      asyncUpdateDiscount({
        disCode: disCode,
        disDesc: disDesc,
        disPeriod: disPeriod,
        restaurant: { resCode: resCode },
      })
    );
  };

  const onCancelDiscount = async (e) => {
    e.preventDefault();

    // 초기화 액션을 디스패치하여 상태를 초기화
    dispatch(resetState());

    await dispatch(asyncDeleteDiscount(disCode));
  };

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5  bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <Container>
          <H1>할인관리</H1>
          <Form
            onSubmit={onAddDiscount}
            style={{ width: "600px", margin: "0 auto" }}
          >
            <Form.Group className="mb-4">
              <Form.Label>할인설명</Form.Label>
              <Form.Control
                type="text"
                placeholder="할인등록, 할인수정시 작성해주세요."
                id="disDesc"
                name="disDesc"
                value={disDesc}
                onChange={(e) => setDisDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>할인기간</Form.Label>
              <Form.Control
                type="text"
                placeholder="할인등록, 할인수정시 작성해주세요."
                name="disPeriod"
                value={disPeriod}
                onChange={(e) => setDisPeriod(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>식당코드</Form.Label>
              <Form.Control
                type="text"
                placeholder="할인등록, 할인수정시 작성해주세요."
                name="resCode"
                value={resCode}
                onChange={(e) => setResCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>할인코드</Form.Label>
              <Form.Control
                type="text"
                placeholder="할인조회, 할인수정, 할인삭제시 작성해주세요."
                name="disCode"
                value={disCode}
                onChange={(e) => setDisCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex justify-content-center">
              <span className="btn1" style={{ paddingRight: "25px" }}>
                <button type="submit" className="btn btn-primary">
                  할인등록
                </button>
              </span>
              <span className="btn3" style={{ paddingRight: "25px" }}>
                <button
                  type="button"
                  className="btn btn-primary 1"
                  onClick={onViewDiscount}
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
        <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
          {discountError && <p>{discountError}</p>}

          {discountSuccess && <p>{discountSuccess}</p>}

          {discountData && (
            <div>
              <P style={{ marginTop: "20px" }}>
                할인 코드: {discountData.disCode}
              </P>
              <P>할인 설명: {discountData.disDesc}</P>
              <P>할인 기간: {discountData.disPeriod}</P>
              {discountData.restaurant && (
                <P>식당 코드: {discountData.restaurant.resCode}</P>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discount;
