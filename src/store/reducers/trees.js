import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { getTrees } from "../services/reduxServices";

export const pullTrees = createAsyncThunk('PULL_TREES', getTrees)
export const voidTrees = createAction('VOID_TREES')

const treesReducer = createReducer([], {
  [pullTrees.fulfilled]: (state, action) => action.payload,
  [voidTrees]: (state, action) => [],
});

export default treesReducer;