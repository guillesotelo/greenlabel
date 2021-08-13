import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"
import { 
    registerUser, 
    loginUser, 
    setUserVoid, 
    labelFunc
} from "../services/reduxServices";

const initialState = {
    name: null,
    email: null,
    token: '',
    namedTrees: [],
    img: null,
    personalDescription: null,
}

export const regUser = createAsyncThunk('REGISTER_USER', registerUser)
export const logUser = createAsyncThunk('LOGIN_USER', loginUser)
export const logOutUser = createAsyncThunk('LOGOUT_USER', setUserVoid)
export const setTree = createAsyncThunk('SET_TREE', labelFunc)

const userReducer = createReducer(initialState, {
  [regUser.fulfilled]: (state, action) => action.payload,
  [logUser.fulfilled]: (state, action) => action.payload,
  [logOutUser.fulfilled]: (state, action) => action.payload,
  [setTree.fulfilled]: (state, action) => action.payload,
});

export default userReducer;