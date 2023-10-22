import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncAddLocation, asyncGetLocations } from "../../store/locationSlice";
import { setLocationList } from "../../store/locationSlice";
import { useState } from "react";

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

  const onUpdate = (e) => {
    e.preventDefault();

    console.log(e.target.localCode.value);
    console.log(e.target.localName.value);

    const formData = { localCode, localName };

    // const formData = new FormData();
    //formData.append("localCode", e.target.localCode.value);
    //formData.append("localName", e.target.localName.value);
    console.log(formData);
    dispatch(asyncAddLocation(formData)).then(() =>
      dispatch(asyncGetLocations(1, null))
    );
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
                      //   onClick={() => onDelete(location.localCode)}
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
