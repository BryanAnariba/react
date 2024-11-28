import { createSlice } from "@reduxjs/toolkit";

export interface TodoState {

}

const todoInitialState: TodoState = {}

export const todoSlice = createSlice({
  name: 'todos',
  initialState: todoInitialState,
  reducers: {

  },
});

export const {} = todoSlice.actions;