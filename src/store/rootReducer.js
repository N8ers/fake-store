import { combineReducers } from "redux"

import { searchReducer } from "./search.reducer"
import { userReducer } from "./user.reducer"
import { generalReducer } from "./generalReducer"

export const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
  general: generalReducer,
})
