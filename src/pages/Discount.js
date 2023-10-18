import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  asyncAddDiscount,
  //asyncViewDiscounts,
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

  const onAddDiscount = (e) => {
    e.preventDefault(); //폼 제출을 중지하여 페이지가 다시 로드되지 않게

    const formData = new FormData();
    formData.append("disDesc", e.target.disDesc.value);
    formData.append("disPeriod", e.target.disPeriod.value);
    formData.append("resCode", e.target.resCode.value);

    console.log(formData);

    dispatch(asyncAddDiscount(formData));
  };

  const onSearchDiscount = (e) => {
    e.preventDefault();
    // 할인 조회 기능을 구현합니다.
    // 예를 들어, 입력된 식당 코드 (e.target.resCode.value)를 사용하여 할인 정보를 조회할 수 있습니다.
    dispatch(asyncViewDiscount(e.target.resCode.value));
  };

  const onUpdateDiscount = (e) => {
    e.preventDefault();
    // 할인 수정 기능을 구현합니다.
    // 예를 들어, 입력된 할인 설명, 기간 등을 사용하여 해당 할인을 업데이트할 수 있습니다.
    dispatch(
      asyncUpdateDiscount({
        disDesc: e.target.disDesc.value,
        disPeriod: e.target.disPeriod.value,
        resCode: e.target.resCode.value,
      })
    );
  };

  const onCancelDiscount = (e) => {
    e.preventDefault();
    // 할인 취소 기능을 구현합니다.
    // 예를 들어, 입력된 식당 코드 (e.target.resCode.value)를 사용하여 해당 식당의 할인을 취소할 수 있습니다.
    dispatch(asyncDeleteDiscount(e.target.resCode.value));
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
            style={{ width: "600px", margin: "0 auto" }}
            onSubmit={onSearchDiscount}
          >
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="할인설명" name="disDesc" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="할인기간"
                name="disPeriod"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="식당코드" name="resCode" />
            </Form.Group>
            <Form.Group className="mb-3" style={{ width: "700px" }}>
              <span className="btn1" style={{ paddingRight: "25px" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onAddDiscount}
                >
                  할인등록
                </button>
              </span>
              <span className="btn2" style={{ paddingRight: "25px" }}>
                <button type="submit" className="btn btn-primary">
                  할인전체조회
                </button>
              </span>
              <span className="btn3" style={{ paddingRight: "25px" }}>
                <button type="submit" className="btn btn-primary">
                  할인조회
                </button>
              </span>
              <span className="btn4" style={{ paddingRight: "25px" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onUpdateDiscount}
                >
                  할인등록수정
                </button>
              </span>
              <span className="btn5">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onCancelDiscount}
                >
                  할인등록취소
                </button>
              </span>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Discount;
