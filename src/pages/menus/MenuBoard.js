import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { asyncDeleteMenu, asyncGetMenus } from "../../store/menuSlice";

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

  // const handleSearch = async () => {
  //   const result = await getMenus(page, searchTerm); // 검색어를 API로 전달
  //   setMenus(result.data);
  // };

  const menus = useSelector((state) => state.menu.menuList);

  useEffect(() => {
    dispatch(asyncGetMenus(1)); // 페이지 번호를 전달하여 초기 메뉴 목록 불러오기
  }, [dispatch]);

  const [page, setPage] = useState(1); // 페이지 초기값은 1로 설정

  const [menu, setMenu] = useState([]);

  const onDelete = (menuCode) => {
    // dispatch(asyncDeleteMenu(menu.menuCode));
    const newList = menus.filter(
      (item) => item.menuCode !== parseInt(menuCode)
    );
    setMenu(newList);
    alert(`메뉴를 삭제합니다.`);
  };

  const onUpdate = () => {
    // dispatch(
    //   updateMenu({
    //     resCode: menus.resCode,
    //     menuName: menus.menuName,
    //     menuPrice: menus.menuPrice,
    //     menuPicture: menus.menuPicture,
    //   })
    // );
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
              <td>
                <img src={menu.menuPicture} />
              </td>
              <td>{menu.restaurant.resCode}</td>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => onUpdate(menu.menuCode)}
                >
                  수정
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(menu.menuCode)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-outline-warning">
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
      <button
        type="button"
        className="btn btn-primary"
        id="searchBtn"
        // onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} id="icon" />
      </button>
      <PagingStyle>
        <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </PagingStyle>
    </Container>
  );
};
export default MenuBoard;
