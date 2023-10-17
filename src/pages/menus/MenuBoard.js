import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { asyncGetMenus } from "../../store/menuSlice";
import { getMenus } from "../../api/menu";

const PagingStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  a {
    padding: 5px;
  }
`;

const MenuBoard = () => {
  const dispatch = useDispatch();

  // const menuList = useSelector((state) => state.menu.menuList);

  const [menus, setMenus] = useState([]);
  const [id, setId] = useState(1);
  const [page, setPage] = useState(1); // 페이지 초기값은 1로 설정

  const menuAPI = async () => {
    const result = await getMenus(page);
    console.log(result.data);
    setMenus([...menus, ...result.data]);
  };

  useEffect(() => {
    menuAPI();
  }, []);

  const handleDelete = (id) => {
    // 여기에 삭제 로직을 구현합니다.
    alert(`ID가 ${id}인 메뉴를 삭제합니다.`);
  };

  return (
    <Container>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>구분</th>
            <th>식당명</th>
            <th>가격</th>
            <th>이미지</th>
            <th>식당코드</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.menuName}</td>
              <td>{menu.menuPrice}</td>
              <td>{menu.menuPicture}</td>
              <td>{menu.resCode}</td>
              <td>
                <button onClick={() => handleDelete(menu.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <Link to="/addmenu">삽입</Link>
      </button>

      <PagingStyle>
        {/* <div>
          <a href="#"> Prev</a>
          <a href="#">Num</a>
          <a href="#">Next</a>
        </div> */}
      </PagingStyle>
    </Container>
  );
};
export default MenuBoard;
