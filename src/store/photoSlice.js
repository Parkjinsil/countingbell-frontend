import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    addPhoto,
    getPhotos,
    updatePhoto,
    // getPhoto,
    deletePhoto} from "../api/photo";
import { asyncUpdateMenu } from "./menuSlice";

const asyncAddPhoto = createAsyncThunk(
    "photoSlice/asyncAddPhoto",
    async (data) => {
        const result = await addPhoto(data);
        return result.data;
    }
);

const asyncGetPhotos = createAsyncThunk(
    "photoSlice/asyncGetPhotos",
    async (page) => {
        const result = await getPhotos(page);
        return result.data;
    }
);

// const asyncGetPhoto = createAsyncThunk(
//     "photoSlice/asyncGetPhoto",
//     async (id) => {
//         const result = await getPhoto(id);
//         return result.data;
//     }
// );

const asyncUpdatePhoto = createAsyncThunk(
    "photoSlice/asyncUpdatePhoto",
    async (data) => {
        const result = await updatePhoto(data);
        return result.data;
    }
)

const photoSlice = createSlice({
    name: "photoSlice",
    initialState: {photoList: [], selectedPhoto: null},
    reducers: {
        setPhotoList: (state, action) => {
            state.photoList = action.payload;
        },
        setSelectedPhoto: (state, action) => {
            state.selectedPhoto = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(asyncAddPhoto.rejected, (state, action) => {
            return alert("사진 등록에 실패했습니다. 다시 시도해주세요.");
        })
        .addCase(asyncAddPhoto.fulfilled, (state, action) => {
            alert("사진 등록 성공!");
            state.photoList.push(action.payload);
        });

        builder.addCase(asyncGetPhotos.fulfilled, (state, action) => {
            state.photoList = action.payload;
        });

        builder
        .addCase(asyncUpdatePhoto.rejected, (state, action) => {
            return alert("사진 수정에 실패했습니다. 다시 시도해주세요.");
        })
        .addCase(asyncUpdatePhoto.fulfilled, (state, action) => {
            alert("사진 수정에 성공했습니다.");
        });
    }
});

export default photoSlice;
export { asyncAddPhoto, asyncGetPhotos, asyncUpdatePhoto };
export const {setPhotoList, setSelectedPhoto} = photoSlice.actions;