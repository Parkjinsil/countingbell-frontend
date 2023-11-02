import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMenu, updateMenu } from "../../api/menu";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";

import {
  asyncFindByMenuCode,
  asyncGetMenus,
  asyncUpdateMenu,
} from "../../store/menuSlice";

const MenuBoard = () => {
  const menus = useSelector((state) => state.menu.menuList);
  const [menuName, setMenuName] = useState("");
  const [menuDesc, setMenuDesc] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuPicture, setMenuPicture] = useState(null);
  const [menuCode, setMenuCode] = useState("");
  const { resCode } = useParams(); // URL에서 가져온 resCodes

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("받아온 resCode:", resCode);

  // 식당별 메뉴 불러오기
  useEffect(() => {
    dispatch(asyncFindByMenuCode({ page: 1, resCode: resCode }));
  }, [dispatch, resCode]);

  // 메뉴 등록하러 가기
  const onAddmenu = () => {
    console.log("resCode22 어떻게 보내지? : " + resCode);
    navigate(`/addmenu/${resCode}`);
  };

  // 메뉴 삭제
  const onDelete = async (menuCode) => {
    try {
      await deleteMenu(menuCode); // 해당 메뉴를 삭제하는 비동기 함수를 호출
      alert(`메뉴를 삭제했습니다.`);

      await dispatch(asyncGetMenus(1)); // Redux 상태 업데이트
    } catch (error) {
      alert(`메뉴 삭제에 실패했습니다. 에러: ${error.message}`);
    }
  };

  // 메뉴수정
  const onUpdate = async (e) => {
    e.preventDefault();
    console.log(menuName);
    console.log(menuDesc);
    console.log(menuPrice);
    console.log(menuPicture);
    console.log(typeof menuPicture);
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
                <th>수정</th>
                <th>삭제</th>
                {/* <th>식당코드</th> */}
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
                  {/* <td>{menu.restaurant.resCode}</td> */}

                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${menu.menuCode}`}
                      data-bs-whatever="@mdo"
                      onClick={() => {
                        setMenuName(menu.menuName);
                        setMenuPrice(menu.menuPrice);
                        setMenuPicture(menu.menuPicture);
                        setMenuDesc(menu.menuDesc);
                        setMenuCode(menu.menuCode);
                        // setResCode(menu.restaurant.resCode);
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
                                    // setResCode(e.target.value);
                                  }}
                                  // readOnly
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
                                  onChange={(e) => {
                                    console.log("e.target 값 : " + e.target); // 정상임
                                    console.log(
                                      "menu.menuPicture값 : " + menu.menuPicture
                                    ); // 값 ok
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
                              닫기
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
        <button className="btn btn-outline-warning" onClick={onAddmenu}>
          추가
        </button>
      </div>
    </div>
  );
};
export default MenuBoard;
