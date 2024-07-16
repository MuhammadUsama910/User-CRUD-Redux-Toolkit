import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"; 
import axios from "axios";

// enums. Now no one can change the property values of STATUSES object because we freeze it.
// Now it is readonly.
const STATUSES = Object.freeze({
  IDLE: "idle", 
  ERROR: "error",
  LOADING: "loading"
})

const initialState = {
  users: [],
  status: STATUSES.IDLE
}


export const fetchUsers = createAsyncThunk('users/fetch', async () => {

  const usersResponse = await axios.get("https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users");
  return usersResponse.data;
})


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

   /* addUser: (state, action) => {

      console.log("addUser Reducer: ", action.payload);

      // Do Not Do This. NEVER !
      // const users = await axios.get("https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users");

      // Koi Bhi Asynchronous call ap reducer k anadar sy nahin kar sakty ho.
      // Kiun k reducers jo hoty hain wo synchrounously call hoty hain or wo pure functions hoty hn.
      //pure functions ka matlab k reducers koi bhi sideeffect manage nai kr sakta. like API Calls etc.
      // To api call k liye ham thunk middleware use kryn gy

      
      // const createUser = {
      //   id: 1,
      //   name:"",
      //   email:"",
      //   profession:"",
      //   gender:"",
      //   address: {
      //     city:"",
      //     street:"",
      //     house:""
      //   }
    },

    removeUser: (state, action) => {

    },

    updateUser: (state, action) => {

    }
  */
  },

  extraReducers: (builder) => {

    builder
      .addCase(fetchUsers.pending, (state, action) => {
        
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        
        state.users = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchUsers.rejected, (state, action) => {

        // state.users = [];
        state.status = STATUSES.ERROR;
      })
  }

})



export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
