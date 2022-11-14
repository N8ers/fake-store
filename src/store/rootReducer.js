import { combineReducers } from "redux"

import { searchReducer } from "./search.reducer"
import { userReducer } from "./user.reducer"

export const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
})
