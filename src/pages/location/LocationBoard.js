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

    const formData = { localCode, localName };

    console.log(formData);
    dispatch(asyncAddLocation(formData)).then(() => {
      dispatch(asyncGetLocations(1, null));
      setLocalCode(""); // localCode 초기화
      setLocalName(""); // localName 초기화
    });
  };

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

    console.log(updatedLocalCode);
    console.log(updatedLocalName);

    const formData = {
      localCode: updatedLocalCode,
      localName: updatedLocalName,
    };

    console.log(formData);

    console.log("formData이후 : " + localCode);
    console.log("formData이후 : " + localName);
    dispatch(asyncUpdateLocation(formData)).then(() => {
      dispatch(asyncGetLocations(1, null));

      setLocalCode(""); // localCode 초기화
      setLocalName(""); // localName 초기화

      console.log("초기화 이후 : " + localCode);
      console.log("초기화 이후 : " + localName);
    });
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
          <table className="table table-hover">
            <thead>
              <tr>
                <th>구분</th>
                <th>위치</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {locations.map((location, index) => (
                <tr key={index}>
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

          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={toggleAddTable}
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

          <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
            {showAddTable && (
              <Form onSubmit={onAddLocation}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="위치 코드"
                    name="localCode"
                    hidden
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="위치 입력"
                    name="localName"
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
        </Container>
      </div>
    </div>
  );
};

export default LocaionBoard;
