import { createSlice } from "@reduxjs/toolkit";

export interface UiSliceInitialState {
  isDateModalOpen: boolean;
}

const initialState: UiSliceInitialState = {
  isDateModalOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    }
  },
});

export const { onCloseDateModal, onOpenDateModal } = uiSlice.actions;