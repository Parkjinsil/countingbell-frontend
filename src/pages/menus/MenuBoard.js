import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const MenuBoard = () => {
  const dispatch = useDispatch();

  // Redux 상태 읽기
  const menu = useSelector((state) => state.menu.menuList);

  const [id, setId] = useState(1);
  // 메뉴 목록 가져오기
  const [menuList, setMenuList] = useState([]);

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
          {menuList.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.menuName}</td>
              <td>{menu.menuPrice}</td>
              <td>{menu.menuPicture}</td>
              <td>{menu.resCode}</td>
              <td>
                <button>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <Link to="/addmenu">삽입</Link>
      </button>
    </Container>
  );
};
export default MenuBoard;
