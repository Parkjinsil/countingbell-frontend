import React, { useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncGetLocations } from "../../store/locationSlice";
import { setLocationList } from "../../store/locationSlice";
import { useState } from "react";

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

const LocationList = () => {
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

  const [selectedLocalCode, setSelectedLocalCode] = useState(null);

  // localCode를 클릭 시 이동
  const takeValueclick = (location) => {
    const localCode = location.localCode;
    setSelectedLocalCode(localCode);
    navigate(`/locationResList/${localCode}`);
  };

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5  bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <Container>
          <div className="d-flex flex-wrap">
            {locations.map((location, index) => (
              <button
                key={location.localCode}
                className="btn btn-secondary m-2"
                onClick={() => takeValueclick(location)}
              >
                {location.localName}
              </button>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};
export default LocationList;
