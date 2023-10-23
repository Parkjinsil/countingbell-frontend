import React, { useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncAddLocation,
  asyncGetLocations,
  asyncUpdateLocation,
} from "../../store/locationSlice";
import { setLocationList } from "../../store/locationSlice";
import { useState } from "react";
import { deleteLocation } from "../../api/location";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const LocaionBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localCode, setLocalCode] = useState("");
  const [localName, setLocalName] = useState("");

  const locations = useSelector((state) => state.location.locationList);

  useEffect(() => {
    dispatch(asyncGetLocations(1));
    const updatedLocationList = [];
    dispatch(setLocationList(updatedLocationList));
  }, [dispatch]);

  // 지역 등록
  const [showAddTable, setShowAddTable] = useState(false);
  const toggleAddTable = () => {
    setShowAddTable(!showAddTable);
    if (showUpdateTable) {
      setShowUpdateTable(false); // 수정 폼 닫기
    }
  };

  const onAddLocation = (e) => {
    e.preventDefault();

    console.log(e.target.localCode.value);
    console.log(e.target.localName.value);

    if (!localName) {
      alert("모든 필드를 입력해주세요."); // 빈 필드가 있을 경우 알림 표시
      return;
    }

    const formData = { localCode, localName };

    console.log(formData);
    dispatch(asyncAddLocation(formData));
    setLocalName(""); // localName 초기화
  };

  // useEffect(() => {}, [locations]);

  // 지역 수정
  const [showUpdateTable, setShowUpdateTable] = useState(false);
  const toggleUpdateTable = () => {
    setShowUpdateTable(!showUpdateTable);
    if (showAddTable) {
      setShowAddTable(false); // 추가 폼 닫기
    }
  };

  const onUpdateLocation = (e) => {
    e.preventDefault();

    const updatedLocalCode = e.target.localCode.value;
    const updatedLocalName = e.target.localName.value;

    if (!updatedLocalCode || !updatedLocalName) {
      alert("모든 필드를 입력해주세요."); // 빈 필드가 있을 경우 알림 표시
      return;
    }

    const formData = {
      localCode: updatedLocalCode,
      localName: updatedLocalName,
    };
    console.log(formData);

    dispatch(asyncUpdateLocation(formData));
    setShowUpdateTable(false);
  };

  // 지역 삭제
  const onDelete = async (localCode) => {
    try {
      await deleteLocation(localCode); // 해당 메뉴를 삭제하는 비동기 함수를 호출
      alert(`지역을 삭제했습니다.`);

      await dispatch(asyncGetLocations(1)); // Redux 상태 업데이트
    } catch (error) {
      alert(`지역 삭제에 실패했습니다. 에러: ${error.message}`);
    }
  };

  // 지역 검색
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5  bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <Container>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>구분</th>
                <th>위치</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {locations?.map((location) => (
                <tr key={location.localCode}>
                  <td>{location.localCode}</td>
                  <td>{location.localName}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(location.localCode)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={toggleAddTable}
          style={{}}
        >
          추가
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={toggleUpdateTable}
        >
          수정
        </button>

        <div
          className="input-group mb-3"
          style={{ width: "300px", alignItems: "center", marginTop: "15px" }}
        >
          <input
            type="search"
            className="form-control"
            name="search"
            id="search"
            placeholder="검색"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 시 상태 업데이트
          />

          <button
            type="button"
            className="btn btn-primary"
            id="searchBtn"
            // onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} id="icon" />
          </button>
        </div>
      </div>

      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
        {showAddTable && (
          <Form onSubmit={onAddLocation}>
            <Form.Group className="mb-3">
              {/* <Form.Control
                type="text"
                placeholder="위치 코드"
                name="localCode"
                hidden
              /> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="위치 입력"
                name="localName"
                value={localName}
                onChange={(e) => {
                  setLocalName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="submit" value="위치 등록" />
            </Form.Group>
          </Form>
        )}
        {showUpdateTable && (
          <Form onSubmit={onUpdateLocation}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="위치 코드"
                name="localCode"
                value={localCode}
                onChange={(e) => {
                  setLocalCode(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="위치 입력"
                name="localName"
                value={localName}
                onChange={(e) => {
                  setLocalName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="submit" value="위치 수정" />
            </Form.Group>
          </Form>
        )}
      </div>
    </div>
  );
};

export default LocaionBoard;
