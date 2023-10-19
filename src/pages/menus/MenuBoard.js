import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { getMenus, updateMenu } from "../../api/menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
  const navigate = useNavigate();

  // 검색어
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    const result = await getMenus(page, searchTerm); // 검색어를 API로 전달
    setMenus(result.data);
  };

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

  const onDelete = (menuCode) => {
    const newList = menus.filter(
      (item) => item.menuCode !== parseInt(menuCode)
    );

    setMenus(newList);
    alert(`메뉴를 삭제합니다.`);
  };

  const onUpdate = () => {
    dispatch(
      updateMenu({
        resCode: menus.resCode,
        menuName: menus.menuName,
        menuPrice: menus.menuPrice,
        menuPicture: menus.menuPicture,
      })
    );
    navigate("/updatemenu");
  };

  return (
    <Container>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>구분</th>
            <th>메뉴명</th>
            <th>가격</th>
            <th>이미지</th>
            <th>식당코드</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.menuCode}>
              <td>{menu.menuCode}</td>
              <td>{menu.menuName}</td>
              <td>{menu.menuPrice}</td>
              <td>{menu.menuPicture}</td>
              <td>{menu.restaurant.resCode}</td>
              <td>
                <button onClick={() => onUpdate(menu.menuCode)}>수정</button>
              </td>
              <td>
                <button onClick={() => onDelete(menu.menuCode)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <Link to="/addmenu">추가</Link>
      </button>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 시 상태 업데이트
      />
      <button type="button" id="searchBtn" onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} id="icon" />
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
