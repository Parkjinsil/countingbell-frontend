import React from "react";
import styled from "styled-components";
import image1 from "../assets/111.jpg";

const Container = styled.div`
  display: inline-block;
  background-color: azure;
  padding: 120px;
  width: 100vw;
  height: 100vh;
`;

const Top = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ListContainer = styled.div`
  display: flex;
  /* justify-content: center; */

  table {
    width: 100%;
    th,
    td {
      padding: 10px; /* 셀 안의 내용과 테두리 간격을 조정 (예시 값) */
      text-align: center; /* 셀 안의 텍스트 가운데 정렬 (선택적) */
    }
  }
`;

const HorizontalLine = styled.div`
  border-bottom: 2px solid #000; /* 선의 높이와 색상을 조절*/
  border-color: #ff5e33;
  margin: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
const RecentList = ({ list }) => {
  // const onClick = (event) => {
  //   addRestaurant(event.target.id);
  // };
  return (
    <Container>
      <Top>
        <div>
          <h1>최근 본 상품</h1>
        </div>
        <HorizontalLine></HorizontalLine>
      </Top>

      <ListContainer>
        <div>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>식당명</th>
                <th>예약</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={image1}
                      alt="image1"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <button id={item.id}>예약</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ListContainer>
      <Bottom>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </Bottom>
    </Container>
  );
};
export default RecentList;
