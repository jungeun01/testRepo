import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatas } from "../api/firebase";

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
//createAsyncThunk()함수안에 처음에 들어갈 파라미터는 action -

export default diarySlice;
export { fetchItems };
