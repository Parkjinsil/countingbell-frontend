import React, { useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteReser } from "../../api/reser";
import { useNavigate, useParams } from "react-router-dom";
import { asyncFindReserById } from "../../store/reserSlice";

const ReserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const resers = useSelector((state) => state.reser.reserList);

  useEffect(() => {
    dispatch(asyncFindReserById(id));
  }, []);

  // 메뉴 삭제
  const onDelete = async (reserCode) => {
    try {
      await deleteReser(reserCode);
      alert("예약을 취소했습니다.");

      // 취소 후 화면을 새로 고침
      window.location.reload();
    } catch (error) {
      alert(`예약 취소에 실패했습니다. 에러: ${error.message}`);
    }
  };

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5  bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <div
          className="input-group mb-3"
          style={{ width: "300px", marginLeft: "900px" }}
        ></div>
        <Container>
          <table className="table table-hover" style={{ marginTop: "30px" }}>
            <thead>
              <tr>
                <th>예약코드</th>
                <th>식당명</th>
                <th>예약인원</th>
                <th>예약일시</th>
              </tr>
            </thead>
            <tbody
              className="table-group-divider"
              style={{ lineHeight: " 100px" }}
            >
              {resers.map((reser, index) => (
                <tr key={reser.reserCode} style={{ lineHeight: "150px" }}>
                  <td>{reser.reserCode}</td>
                  <td>{reser.restaurant.resName}</td>
                  <td>{reser.reserPer}</td>
                  <td>
                    {reser.reserDate.substring(0,10)} &nbsp;&nbsp; {reser.reserTime}
                  </td>
                  <td>
                    <button style={{
                      fontSize: "1em",
                      border: "solid 1px #FF6B01",
                      color: "#FF6B01",
                      backgroundColor: "transparent"
                    }}
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(reser.reserCode)}
                    >
                      취소
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    </div>
  );
};

export default ReserList;
