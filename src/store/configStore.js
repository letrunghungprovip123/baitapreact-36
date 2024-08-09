import { configureStore } from '@reduxjs/toolkit'
import arrNhanVienSlice from "./Slice/arrNhanVienSlice"
export const store = configureStore({
  reducer: {
    hoTen: () => {
        return "Hung"
    },
    arrNhanVienSlice
  },
})