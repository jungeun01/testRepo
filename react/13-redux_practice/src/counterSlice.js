import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { plus: 0, minus: 50 },
  reducers: {
    up: (state, action) => {
      console.log(action);
      // state.value = state.value + action.step;
      state.plus = state.plus + action.payload;
    },
    down: (state, action) => {
      console.log(action);
      state.minus = state.minus - action.payload;
    },
  },
});

export default counterSlice;
export const { up, down } = counterSlice.actions;
// export const { down } = counterSlice.actions;

// counterSlice()를 만들때 왜 initialState를 넣지?정의
