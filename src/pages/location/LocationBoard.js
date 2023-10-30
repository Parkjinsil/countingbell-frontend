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

const Nav = styled.div`
  position: fixed;
  background-color: white;
  width: 100%;
  height: 56px;

  padding-left: 15px;

  a {
    background-color: #eee;
    padding: 5px 10px;
    border-radius: 5px;
    line-height: 56px;
    margin: 5px;

    &.active {
      background-color: black;
      color: white;
    }
  }
`;

const LocaionBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localCode, setLocalCode] = useState("");
  const [localName, setLocalName] = useState("");

  const [showAddTable, setShowAddTable] = useState(false);
  const [showUpdateTable, setShowUpdateTable] = useState(false);

  const locations = useSelector((state) => state.location.locationList);

  useEffect(() => {
    dispatch(asyncGetLocations(1));
    const updatedLocationList = [];
    dispatch(setLocationList(updatedLocationList));
  }, [dispatch]);

  // 지역 등록

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
    setLocalCode("");
    setLocalName(""); // localName 초기화
  };

  const [selectedLocalCode, setSelectedLocalCode] = useState(null);

  // 지역 수정
  const toggleUpdateTable = () => {
    setShowUpdateTable(!showUpdateTable);
    setLocalCode(""); //  초기화

    if (showAddTable) {
      setShowAddTable(false); // 추가 폼 닫기
    }
  };

  // 클릭한 행값 가져오기
  const takeValueclick = (location) => {
    setSelectedLocalCode(location.localCode);
    setLocalCode(location.localCode); // 클릭한 위치의 localCode를 설정
    setLocalName(location.localName); // 클릭한 위치의 localName을 설정
  };

  // 수정 로직
  const UpdateLocation = (e) => {
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
    setLocalCode("");
    setLocalName("");
    setShowUpdateTable(false);
  };

  // 지역별 식당찾기
  const findRestaurant = () => {
    // toggleTable이 열리지 않았을 때만 식당 페이지로 이동
    if (!showUpdateTable && !showAddTable) {
      navigate("/locationResList");
    }
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

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5  bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <Container>
          <table className="table table-hover" id="tableValue">
            <thead>
              <tr>
                <th>구분</th>
                <th>위치</th>
                <th>삭제</th>
                <th hidden>위치코드</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {locations.map((location, index) => (
                <tr
                  key={location.localCode}
                  onClick={() => findRestaurant(location)}
                >
                  <td>{locations.length - index}</td>
                  <td onClick={() => takeValueclick(location)}>
                    {location.localName}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(location.localCode)}
                    >
                      삭제
                    </button>
                  </td>
                  <td hidden>{location.localCode}</td>
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
        >
          추가
        </button>
        <td>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={toggleUpdateTable}
          >
            수정
          </button>
        </td>
      </div>

      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
        {showAddTable && (
          <Form onSubmit={onAddLocation}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="위치 코드"
                name="localCode"
                // defaultValue={localCode}
                hidden
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
              <Form.Control type="submit" value="위치 등록" />
            </Form.Group>
          </Form>
        )}
        {showUpdateTable && (
          <Form onSubmit={UpdateLocation}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="수정을 원하는 위치를 클릭하세요"
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
                placeholder="수정할 위치 입력"
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
