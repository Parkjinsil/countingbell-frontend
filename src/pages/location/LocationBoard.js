import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncAddLocation, asyncGetLocations } from "../../store/locationSlice";
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

  const [showAddTable, setShowAddTable] = useState(false);

  const toggleAddTable = () => {
    setShowAddTable(!showAddTable);
  };

  // 지역 등록
  const onUpdate = (e) => {
    e.preventDefault();

    console.log(e.target.localCode.value);
    console.log(e.target.localName.value);

    const formData = { localCode, localName };

    console.log(formData);
    dispatch(asyncAddLocation(formData)).then(() =>
      dispatch(asyncGetLocations(1, null))
    );
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
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {locations.map((location) => (
                <tr key={location.localCode}>
                  <td>{location.localCode}</td>
                  <td>{location.localName}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      // onClick={() => onUpdate(location.localCode)}
                    >
                      수정
                    </button>
                  </td>
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
          <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-3 mt-5">
            {showAddTable && (
              <Form onSubmit={onUpdate}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="위치 코드"
                    name="localCode"
                    //readOnly
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
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LocaionBoard;
