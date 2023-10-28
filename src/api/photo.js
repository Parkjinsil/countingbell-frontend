import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addPhoto = async (data) => {
    return await instance.post("photo", data);
  };

  export const getPhotos = async (page) => {
    let url = `photo?page=${page}`;
    return await instance.get(url);
  };
  
  // export const getPhoto = async (id) => {
  //   let url = `photo/${id}`;
  //   return await instance.get(url);
  // };
  
  export const updatePhoto = async (data) => {
    return await instance.put("photo", data);
  };
  
  export const deletePhoto = async (id) => {
    return await instance.delete("photo/" + id);
  };
