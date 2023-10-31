import React, { useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncGetLocations } from "../../store/locationSlice";
import { setLocationList } from "../../store/locationSlice";
import { useState } from "react";

const LocationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const locations = useSelector((state) => state.location.locationList);

  useEffect(() => {
    dispatch(asyncGetLocations(1));
  }, [dispatch]);

  const [selectedLocalCode, setSelectedLocalCode] = useState(null);

  // localCode를 클릭 시 이동
  const takeValueclick = (location) => {
    const localCode = location.localCode;
    setSelectedLocalCode(localCode);
    navigate(`/locationResList/${localCode}`);
  };

  return (
    <div
      className="container my-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="position-relative p-5  bg-body border border-dashed rounded-5">
        <Container>
          <div
            className="d-flex flex-wrap"
            style={{ gap: "50px", margin: "0 170px" }}
          >
            {locations
              .slice()
              .reverse()
              .map((location, index) => (
                <button
                  key={location.localCode}
                  className="btn btn-outline-primary m-2"
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    minWidth: "150px",
                    minHeight: "90px",
                  }}
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
