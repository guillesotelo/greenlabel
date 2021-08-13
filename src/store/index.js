import { configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger'
import userReducer from "./reducers/user"
import treesReducer from "./reducers/trees"
import pullNamedTreesReducer from "./reducers/named"
import setTypeSearchReducer from './reducers/search'

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger),
    reducer: {
        user: userReducer,
        trees: treesReducer,
        named: pullNamedTreesReducer,
        searchType: setTypeSearchReducer
    }
})

export default store