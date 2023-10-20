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

  //성공 및 에러 메시지에 대한 별도의 상태 
  //const [successMessage, setSuccessMessage] = useState(null);
  //const [errorMessage, setErrorMessage] = useState(null);


  //Redux 스토어에서 할인 정보를 선택하고 이를 useState를 사용하여 로컬 상태에 저장
  const discountError = useSelector(state => state.discount.error);
  const discountSuccess = useSelector(state => state.discount.success);
  const discountData = useSelector(state => state.discount.data);

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
        resCode: resCode,
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
                placeholder="식당코드 : 할인등록, 할인수정시 작성해주세요."
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
        <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
          {discountError && <p>{discountError}</p>} 
          {discountSuccess && <p>{discountSuccess}</p>} 
          {discountData && (
              <div>
                <p>할인 코드: {discountData.disCode}</p>
                <p>할인 설명: {discountData.disDesc}</p>
                <p>할인 기간: {discountData.disPeriod}</p>
                {discountData.restaurant && (<p>식당 코드: {discountData.restaurant.resCode}</p>)}
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default Discount;
