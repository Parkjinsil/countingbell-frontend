import React, { useState } from "react";
import styled from "styled-components";
import { getRestaurantByName } from "../api/restaurant";

const Container = styled.div`
  padding-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  .title {
    font-size: 2rem;
    font-weight: bold;
  }

  button {
    font-size: 1em;
    padding: 10px 20px;
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

const Waiting = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [userInput, setUserInput] = useState("");

  const searchValue = (e) => {
    e.preventDefault();
    setUserInput(e.target.value.toLowerCase());
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await getRestaurantByName(userInput);
      const data = response.data;
      setWaitingList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Main>
        <div className="title">
          <h1>온라인 줄서기</h1>
        </div>
        <div className="searchResName">
          <h1>식당 검색</h1>
          <form onSubmit={handleSearch}>
            <input type="text" value={userInput} onChange={searchValue} />
            <button type="submit">검색</button>
          </form>
        </div>
      </Main>
    </Container>
  );
};
export default Waiting;
