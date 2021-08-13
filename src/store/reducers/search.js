import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"
import { setTypeSearch } from "../services/reduxServices";

export const setType = createAsyncThunk('SET_TYPE', setTypeSearch)

const setTypeSearchReducer = createReducer([], {
[setType.fulfilled]: (state, action) => action.payload
});

export default setTypeSearchReducer;

