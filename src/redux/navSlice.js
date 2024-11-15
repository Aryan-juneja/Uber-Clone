import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  source: 0,
  destination: 0,
  distance: 0,
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state,action) => {
      state.source = action.payload
      // console.log(state.source)
    },
    setDestination: (state,action) => {
      state.destination =action.payload
      // console.log(state.destination)
    },
    distanceBtwThem: (state, action) => {
      // console.log("hjkgcvcdkasvk",action.payload)
        state.distance =action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, distanceBtwThem } = navSlice.actions

export default navSlice.reducer