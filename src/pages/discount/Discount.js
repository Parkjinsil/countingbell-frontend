import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"; // useSelector를 사용하여 Redux 스토어의 상태를 읽어옵니다.
import {
  asyncAddDiscount,
  asyncFindByDisCode,
  asyncUpdateDiscount,
  asyncDeleteDiscount,
} from "../../store/discountSlice";
import { useParams } from "react-router-dom";

const StyleNav = styled.div`
  .nav-pills > .nav-item.active > .nav-link {
    background-color: #fcac6b !important;
  }
`;

const H1 = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 15px 20px 50px 20px;
`;

const P = styled.p`
  margin-top: 3px;
`;

const Discount = () => {
  const { resCode } = useParams();
  const dispatch = useDispatch();
  const [disDesc, setDisDesc] = useState(""); // 할인설명 상태
  const [disPeriod, setDisPeriod] = useState(""); // 할인기간 상태
  // const [resCode, setResCode] = useState(""); // 식당코드 상태
  const [disCode, setDisCode] = useState(""); // 할인코드 상태
  const [activeTab, setActiveTab] = useState("add");

  //Redux 스토어에서 할인 정보를 선택하고 이를 useState를 사용하여 로컬 상태에 저장
  const discountError = useSelector((state) => state.discount.error);
  const discountSuccess = useSelector((state) => state.discount.success);
  const discountData = useSelector((state) => state.discount.data);
  const discounts = useSelector((state) => state.discount.disList);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    dispatch(resetState());
  };

  const resetState = () => {
    return {
      type: "discountSlice/resetState",
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

    dispatch(asyncAddDiscount(formData)).then(() => {
      // 추가가 성공한 경우, 입력 폼 초기화
      setDisDesc("");
      setDisPeriod("");
      //setResCode("");
    });
  };

  const onFindByDisCode = async (e) => {
    e.preventDefault();

    // 초기화 액션을 디스패치하여 상태를 초기화
    dispatch(resetState());

    dispatch(asyncFindByDisCode(resCode)).then(() => {
      // 조회가 성공한 경우, 입력 폼 초기화
      //setResCode("");
    });
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
    ).then(() => {
      // 업데이트가 성공한 경우, 입력 폼 초기화
      setDisCode("");
      setDisDesc("");
      setDisPeriod("");
      //setResCode("");
    });
  };

  const onCancelDiscount = async (e) => {
    e.preventDefault();

    // 초기화 액션을 디스패치하여 상태를 초기화
    dispatch(resetState());

    await dispatch(asyncDeleteDiscount(disCode)).then(() => {
      // 삭제가 성공한 경우, 입력 폼 초기화
      setDisCode("");
    });
  };

  return (
    <Container>
      <div className="container my-5">
        <div
          className="position-relative p-5  bg-body border border-dashed rounded-5"
          style={{ marginTop: "100px" }}
        >
          <H1>할인관리</H1>
          <StyleNav>
            <nav
              id="navbar-example2"
              className="row navbar bg-body justify-content-center"
            >
              <ul
                className="col-lg-7 nav nav-pills"
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <li
                  className={`col nav-item text-center ${
                    activeTab === "add" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link fs-5 fw-semibold"
                    href="#scrollspyHeading1"
                    style={{ color: "#868383", padding: "15px" }}
                    onClick={() => handleTabClick("add")}
                  >
                    할인등록
                  </a>
                </li>
                <li
                  className={`col nav-item text-center ${
                    activeTab === "view" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link fs-5 fw-semibold"
                    href="#scrollspyHeading2"
                    style={{ color: "#868383", padding: "15px" }}
                    onClick={() => handleTabClick("view")}
                  >
                    할인조회
                  </a>
                </li>
                <li
                  className={`col nav-item text-center ${
                    activeTab === "update" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link fs-5 fw-semibold"
                    href="#scrollspyHeading3"
                    style={{ color: "#868383", padding: "15px" }}
                    onClick={() => handleTabClick("update")}
                  >
                    할인수정
                  </a>
                </li>
                <li
                  className={`col nav-item text-center ${
                    activeTab === "delete" ? "active" : ""
                  }`}
                >
                  <a
                    className="nav-link fs-5 fw-semibold"
                    href="#scrollspyHeading4"
                    style={{ color: "#868383", padding: "15px" }}
                    onClick={() => handleTabClick("delete")}
                  >
                    할인삭제
                  </a>
                </li>
              </ul>
            </nav>

            <div className="tab-content">
              {activeTab === "add" && (
                <div>
                  <section>
                    <Form
                      onSubmit={onAddDiscount}
                      style={{ width: "600px", margin: "0 auto" }}
                    >
                      <Form.Group className="mb-4 mt-5">
                        <Form.Label>할인설명</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="할인설명을 작성해주세요. / ex) 전메뉴 20%할인"
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
                          placeholder="할인기간을 작성해주세요. / ex) 23.10.29 ~ 23.11.06"
                          name="disPeriod"
                          value={disPeriod}
                          onChange={(e) => setDisPeriod(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>식당코드</Form.Label>
                        <Form.Control
                          type="text"
                          //placeholder="식당(코드번호)을 작성해주세요. / ex) 1"
                          name="resCode"
                          defaultValue={resCode}
                          readOnly
                          // onChange={(e) => setResCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 d-flex justify-content-center">
                        <span className="btn1" style={{ paddingRight: "25px" }}>
                          <button type="submit" className="btn btn-primary">
                            할인등록
                          </button>
                        </span>
                      </Form.Group>
                    </Form>
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
                  </section>
                </div>
              )}

              {activeTab === "view" && (
                <div>
                  <section>
                    <Form
                      onSubmit={onFindByDisCode}
                      style={{ width: "600px", margin: "0 auto" }}
                    >
                      <Form.Group className="mb-4 mt-5">
                        <Form.Label>식당코드</Form.Label>
                        <Form.Control
                          type="text"
                          //placeholder="식당(코드번호)을 작성해주세요. / ex) 1"
                          name="resCode"
                          value={resCode}

                          //onChange={(e) => setResCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 d-flex justify-content-center">
                        <span className="btn3" style={{ paddingRight: "25px" }}>
                          <button
                            type="button"
                            className="btn btn-primary 1"
                            onClick={onFindByDisCode}
                          >
                            할인조회
                          </button>
                        </span>
                      </Form.Group>
                    </Form>
                    <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
                      {discountError && <p>{discountError}</p>}

                      {discountSuccess && <p>{discountSuccess}</p>}

                      {discounts.map((discount) => (
                        <div key={discount.disCode}>
                          <P>할인 코드: {discount.disCode}</P>
                          <P>할인 설명: {discount.disDesc}</P>
                          <P>할인 기간: {discount.disPeriod}</P>
                          {discount.restaurant && (
                            <P>식당 코드: {discount.restaurant.resCode}</P>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "update" && (
                <div>
                  <section>
                    <Form
                      onSubmit={onUpdateDiscount}
                      style={{ width: "600px", margin: "0 auto" }}
                    >
                      <Form.Group className="mb-4 mt-5">
                        <Form.Label>할인설명</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="수정할 할인설명을 작성해주세요."
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
                          placeholder="수정할 할인기간을 작성해주세요."
                          name="disPeriod"
                          value={disPeriod}
                          onChange={(e) => setDisPeriod(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>식당코드</Form.Label>
                        <Form.Control
                          type="text"
                          //placeholder="수정을 원하는 식당(코드번호)을 작성해주세요."
                          name="resCode"
                          defaultValue={resCode}
                          readOnly
                          // onChange={(e) => setResCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>할인코드</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="수정을 원하는 할인(코드번호)을 작성해주세요."
                          name="disCode"
                          value={disCode}
                          onChange={(e) => setDisCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 d-flex justify-content-center">
                        <span className="btn4" style={{ paddingRight: "25px" }}>
                          <button
                            type="button"
                            className="btn btn-primary 2"
                            onClick={onUpdateDiscount}
                          >
                            할인수정
                          </button>
                        </span>
                      </Form.Group>
                    </Form>
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
                  </section>
                </div>
              )}

              {activeTab === "delete" && (
                <div>
                  <section>
                    <Form
                      onSubmit={onCancelDiscount}
                      style={{ width: "600px", margin: "0 auto" }}
                    >
                      <Form.Group className="mb-4 mt-5">
                        <Form.Label>할인코드</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="삭제 하고자 하는 할인(코드번호)을 작성해주세요."
                          name="disCode"
                          value={disCode}
                          onChange={(e) => setDisCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 d-flex justify-content-center">
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
                  </section>
                </div>
              )}
            </div>
          </StyleNav>
        </div>
      </div>
    </Container>
  );
};

export default Discount;
