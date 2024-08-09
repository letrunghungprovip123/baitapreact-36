import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    NhanVien : []
}

const arrNhanVienSlice = createSlice({
  name: "NhanVien",
  initialState,
  reducers: {
    chonArrNhanVien: (state,action) => {
        state.NhanVien = action.payload
    },
  }
});

export const {chonArrNhanVien} = arrNhanVienSlice.actions

export default arrNhanVienSlice.reducer