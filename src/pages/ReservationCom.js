import React from "react";
import {} from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  color: black;
`;

const ReservationCom = () => {
  return (
    <div className="container my-5">
      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5" style={{marginTop:'100px'}}>
        <CheckCircleFill
          className="bi bi-check-circle-fill mt-5 mb-5"
          width="48px"
          height="48px"
        />
        <h1 className="text-body-emphasis fw-bold fs-1">예약완료</h1>
        <p className="col-lg-6 mx-auto mb-4 mt-5">
          고객님, 예약이 완료되었습니다.
          <div style={{ paddingTop: "5px" }}>
            아래 예약내용을 다시 한번 확인해 주시기 바랍니다.
          </div>
        </p>

        <CenteredContainer>
          <table>
            <tr>
              <td width="100px" height="22px">
                매장명 :
              </td>
              <td>레스토랑스</td>
            </tr>
            <tr>
              <td width="100px" height="22px">
                인원 :
              </td>
              <td>성인2명 ㅣ 유아1명</td>
            </tr>
            <tr>
              <td width="100px" height="22px">
                예약일시 :
              </td>
              <td>2023년10월09일 월요일 오후 06:22</td>
            </tr>
          </table>
        </CenteredContainer>

        <button
          className="btn  px-5 mb-5 mt-5"
          type="button"
          style={{ backgroundColor: "#ff6b01", color: "white" }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ReservationCom;
