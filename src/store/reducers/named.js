import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { getNamedTrees } from "../services/reduxServices";


export const pullNamedTrees = createAsyncThunk('PULL_NAMED_TREES', getNamedTrees)
export const setNamedVoid = createAction('SET_NAMED_VOID')


const pullNamedTreesReducer = createReducer([], {
  [pullNamedTrees.fulfilled]: (state, action) => action.payload,
  [setNamedVoid]: (state, action) => [],
});

export default pullNamedTreesReducer;