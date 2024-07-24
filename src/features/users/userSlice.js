import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// enums. Now no one can change the property values of STATUSES object because we freeze it.
// Now it is readonly.
const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  users: [],
  user:[],
  status: STATUSES.IDLE,
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const usersResponse = await axios.get(
    "https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users"
  );
  return usersResponse.data;
});

// export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
//   const response = await axios.get(`https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users/${userId}`);
//   return response.data;
// });

export const createUsers = createAsyncThunk("users/create", async (data) => {
  console.log("SLICE -> data in createUsers function: ", data);
  const newUser = await axios.post(
    "https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users",
    data
  );
  console.log("SLICE -> newUserCreated: ", newUser);
 
  return newUser.data;
});

export const updateUsers = createAsyncThunk("users/update", async ({ id, ...data}) => {

  console.log("SLICE -> data in updateUsers function: ", data);
  const updateUser = await axios.put(`https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users/${id}`, data);
  
  console.log("SLICE -> user updated: ", updateUser);
  return updateUser.data;
})

export const deleteUsers = createAsyncThunk("users/delete", async (id) => {
  console.log("SLICE -> id in deleteUsers function: ", id);
  const deleteUser = await axios.delete(
    `https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users/${id}`);

  console.log("SLICE -> userDeleted: ", deleteUser);
  return deleteUser.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Do Not Do This. NEVER !
    // const users = await axios.get("https://6694e4dc4bd61d8314c9160c.mockapi.io/api/v1/users");

    // Koi Bhi Asynchronous call ap reducer k anadar sy nahin kar sakty ho.
    // Kiun k reducers jo hoty hain wo synchrounously call hoty hain or wo pure functions hoty hn.
    //pure functions ka matlab k reducers koi bhi sideeffect manage nai kr sakta. like API Calls etc.
    // To api call k liye ham thunk middleware use kryn gy

    // addUser: (state, action) => {

    //   state.users.push(action.payload);
    // },

    // removeUser: (state, action) => {

    //   state.users = state.users.filter((user) => user.id !== action.payload);
    // },

    // updateUser: (state, action) => {
    //   const { id, name, email, profession, gender, address } = action.payload;
    //   const existingUser = state.users.find((user) => user.id === id);

    //   if (existingUser) {
    //     (existingUser.name = name),
    //       (existingUser.email = email),
    //       (existingUser.profession = profession),
    //       (existingUser.gender = gender),
    //       (existingUser.address = address);
    //   }
    // },
  },

  extraReducers: (builder) => {
    builder
      //fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.users = [];
        state.status = STATUSES.ERROR;
      })

      //fetch single user based on id
      // .addCase(fetchUserById.pending, (state) => {
      //   state.status = STATUSES.LOADING;
      // })
      // .addCase(fetchUserById.fulfilled, (state, action) => {
      //   state.status = STATUSES.IDLE;
      //   console.log("................................:", action.payload);
      //   // const user = action.payload;
      //   // const existingUser = state.users.find((u) => u.id === user.id);
      //   // if (existingUser) {
      //   //   Object.assign(existingUser, user);
      //   // } else {
      //   //   state.users.push(user);
      //   // }
      // })
      // .addCase(fetchUserById.rejected, (state, action) => {
      //   state.status = STATUSES.ERROR;
      //   // state.error = action.error.message;
      // })


      //createUser addCases
      .addCase(createUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.users.push(action.payload);
      })
      .addCase(createUsers.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      //updateUser addCases
      .addCase(updateUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      //   const index = state.users.findIndex(user => user.id === action.payload.id);
      //   if (index !== -1) {
      //   state.users[index] = action.payload;
      // }
      })
      .addCase(updateUsers.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      //deleteUser addCases
      .addCase(deleteUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteUsers.fulfilled, (state) => {
        // console.log(":",state);
        state.status = STATUSES.IDLE;
        // state.users = action.payload;
      })
      .addCase(deleteUsers.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
