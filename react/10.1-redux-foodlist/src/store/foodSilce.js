import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDatas, deleteDatas } from "../components/firebase";
import { updateDatas } from "../../../12-diary/src/api/firebase";
const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "Loading";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "fail";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
        state.status = "compelet";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (collectionName, addObj) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log("FETCH Error:", error);
    }
  }
);

const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async ({ collectionName, docId, imgUrl }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId, imgUrl);
      return docId;
    } catch (error) {
      console.log("DELETE Error:", error);
    }
  }
);

const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ collectionName, docId, addObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, addObj);
      return resultData;
    } catch (error) {}
  }
);
