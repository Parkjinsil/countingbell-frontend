import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addMenu = async (data) => {
  console.log("메뉴추가 axios call!!");
  return await instance.post("menu", data);
};

let setPage = 1;

export const getMenus = async (page) => {
  if (page !== undefined) {
    setPage = page;
  }
  console.log("메뉴전체보기 axios call!!");
  let url = `public/menu?page=${setPage}`; // 추가하고 돌아올 때 에러
  return await instance.get(url);

  // let url = `public/menu?page=` + data.page; // 삭제할 때 에러
  // localhost:8080/api/public/menu?page=undefined 오류
};

export const getMenu = async (id) => {
  console.log("메뉴 1개보기 axios call!!");
  let url = `public/menu/${id}`;
  return await instance.get(url);
};

export const updateMenu = async (data) => {
  console.log("메뉴수정 axios call!!");
  return await instance.put("menu", data);
};

// 메뉴 삭제
export const deleteMenu = async (id) => {
  return await instance.delete("menu/" + id);
};

// 메뉴명으로 식당찾기
export const findByMenuCode = async (data) => {
  let url = "";
  if (data.resCode === undefined) {
    url = `menu/${data}/restaurant`;
  } else {
    url = `menu/${data.resCode}/restaurant?page=` + data.page;
  }
  console.log(data);
  // let url =
  return await instance.get(url);
};
