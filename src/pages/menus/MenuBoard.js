import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteMenu, updateMenu } from "../../api/menu";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  asyncDeleteMenu,
  asyncGetMenus,
  asyncUpdateMenu,
  setMenuList,
} from "../../store/menuSlice";

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
  const [menuName, setMenuName] = useState("");
  const [menuDesc, setMenuDesc] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuPicture, setMenuPicture] = useState("");
  const [menuCode, setMenuCode] = useState("");
  const [resCode, setResCode] = useState("");
  //const [item, setItem] = useState({});
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
    const updatedMenuList = []; // 업데이트된 메뉴 목록
    dispatch(setMenuList(updatedMenuList)); // Redux 상태 업데이트
  }, [dispatch]);

  const [page, setPage] = useState(1); // 페이지 초기값은 1로 설정

  // const [menu, setMenu] = useState([]);

  const onDelete = async (menuCode) => {
    try {
      await deleteMenu(menuCode); // 해당 메뉴를 삭제하는 비동기 함수를 호출
      alert(`메뉴를 삭제했습니다.`);

      await dispatch(asyncGetMenus(1)); // Redux 상태 업데이트
    } catch (error) {
      alert(`메뉴 삭제에 실패했습니다. 에러: ${error.message}`);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    console.log(menuName);
    console.log(menuDesc);
    console.log(menuPrice);
    console.log(menuPicture);
    console.log(menuCode);
    console.log(resCode);

    // 객체 formData.append 방식으로 넘기기
    const formData = new FormData();

    formData.append("menuCode", menuCode);
    formData.append("menuName", menuName);
    formData.append("menuDesc", menuDesc);
    formData.append("menuPrice", menuPrice);
    formData.append("menuPicture", menuPicture);
    formData.append("resCode", resCode);

    console.log(formData);

    dispatch(asyncUpdateMenu(formData));
  };

  return (
    <div className="container my-5">
      <div
        className="position-relative p-5  bg-body border border-dashed rounded-5"
        style={{ marginTop: "100px" }}
      >
        <div
          className="input-group mb-3"
          style={{ width: "300px", marginLeft: "900px" }}
        >
          <input
            type="search"
            className="form-control"
            name="search"
            id="search"
            placeholder="검색"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
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
        </div>
        <Container>
          <table className="table table-hover" style={{ marginTop: "30px" }}>
            <thead>
              <tr>
                <th>구분</th>
                <th>메뉴코드</th>
                <th>메뉴명</th>
                <th>메뉴설명</th>
                <th>가격</th>
                <th>이미지</th>
                <th>식당코드</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody
              className="table-group-divider"
              style={{ lineHeight: " 100px" }}
            >
              {menus.map((menu, index) => (
                <tr key={menu.menuCode} style={{ lineHeight: "150px" }}>
                  <td>{menus.length - index}</td>
                  <td>{menu.menuCode}</td>
                  <td>{menu.menuName}</td>
                  <td>{menu.menuDesc}</td>
                  <td>{menu.menuPrice}</td>
                  <td style={{ alignItems: "center" }}>
                    <img
                      src={"/upload/" + menu.menuPicture}
                      style={{
                        width: "150px",
                        height: "100px",
                        borderRadius: "10%",
                      }}
                    />
                  </td>
                  <td>{menu.restaurant.resCode}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${menu.menuCode}`}
                      data-bs-whatever="@mdo"
                      onClick={() => {
                        //setItem(menu);
                        setMenuName(menu.menuName);
                        setMenuPrice(menu.menuPrice);
                        setMenuPicture(menu.menuPicture);
                        setMenuCode(menu.menuCode);
                        setResCode(menu.restaurant.resCode);
                      }}
                    >
                      수정
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${menu.menuCode}`}
                      tabIndex="-1"
                      aria-labelledby={`exampleModalLabel${menu.menuCode}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              메뉴 수정하기
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3" hidden>
                                <label
                                  htmlFor="resCode"
                                  className="col-form-label"
                                >
                                  식당코드 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="resCode"
                                  value={menu.restaurant.resCode}
                                  onChange={(e) => {
                                    setResCode(e.target.value);
                                  }}
                                  readOnly
                                />
                              </div>
                              <div className="mb-3" hidden>
                                <label
                                  htmlFor="menuCode"
                                  className="col-form-label"
                                >
                                  메뉴코드 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="menuCode"
                                  value={menu.menuCode}
                                  onChange={(e) => {
                                    setMenuCode(e.target.value);
                                  }}
                                  readOnly
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="menuName"
                                  className="col-form-label"
                                >
                                  메뉴명 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="menuName"
                                  // placeholder={menu.menuName}
                                  value={menuName}
                                  onChange={(e) => {
                                    setMenuName(e.target.value);
                                  }}
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="menuDesc"
                                  className="col-form-label"
                                >
                                  메뉴설명 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="menuDesc"
                                  // placeholder={menu.menuDesc}
                                  value={menuDesc}
                                  onChange={(e) => {
                                    setMenuDesc(e.target.value);
                                  }}
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="menuPrice"
                                  className="col-form-label"
                                >
                                  가격 :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="menuPrice"
                                  // placeholder={menu.menuPrice}
                                  value={menuPrice}
                                  onChange={(e) => {
                                    setMenuPrice(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="menuPicture"
                                  className="col-form-label"
                                >
                                  이미지 :
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="menuPicture"
                                  // 이미지를 수정하지 않을 경우, 기존 이미지 파일 경로를 플레이스홀더로 설정
                                  placeholder={menu.menuPicture}
                                  onChange={(e) => {
                                    console.log(e.target);
                                    setMenuPicture(e.target.files[0]);
                                  }}
                                />
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              취소
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={onUpdate}
                              value={menu}
                            >
                              확인
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
        </Container>
      </div>
      <div>
        <button className="btn btn-outline-warning">
          <Link to="/addmenu">추가</Link>
        </button>
      </div>

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
    </div>
  );
};
export default MenuBoard;
