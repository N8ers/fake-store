import { combineReducers } from "redux"

import { searchReducer } from "./search.reducer"
import { userReducer } from "./user.reducer"
import { generalReducer } from "./generalReducer"
import { cartReducer } from "./cartReducer"

export const rootReducer = combineReducers({
  search: searchReducer,
  user: userReducer,
  general: generalReducer,
  cart: cartReducer,
})
