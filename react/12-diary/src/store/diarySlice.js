import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDatas, deleteDatas, getDatas, updateDatas } from "../api/firebase";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  reducers: {
    // 비동기작업은 actionCreator를 자동으로 만들어줌.
  }, //비동기 작업이 필요없는 애들
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator를 자동으로 만들어주지 못함
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "compelete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "compelete";
      })

      .addCase(updateItem.fulfilled, (state, action) => {
        // state.items = state.items.map((item) => {
        //   item.id === action.payload.id ? action.payload : item;
        // });
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items[index] = action.payload;
        state.status = "compelete";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
        state.status = "compelet";
      });
  }, //비동기 작업이 포함된 애들을 넣어준다
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    console.log(collectionName);
    console.log(queryOptions);
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      // dispatchEvent({type:'FETCH_ITEM',payload:resultData})
      return resultData;
    } catch (error) {
      console.log("FETCH Error:", error);
    }
  }
);
//createAsyncThunk()함수안에 처음에 들어갈 파라미터는 type,payload

const addItem = createAsyncThunk(
  "items/addItem",
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log("ADD Error:", error);
    }
  }
);

const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      console.log("UPDATE Error:", error);
    }
  }
);

const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async ({ collectionName, docId }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId);
      return docId;
    } catch (error) {
      console.log("DELETE Error:", error);
    }
  }
);
export default diarySlice;
export { fetchItems, addItem, updateItem, deleteItem };
