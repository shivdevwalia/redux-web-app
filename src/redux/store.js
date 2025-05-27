import { legacy_createStore, applyMiddleware } from "redux";

import { AppReducer } from "./reducer";
import { thunk } from "redux-thunk";

export const store = legacy_createStore(AppReducer, applyMiddleware(thunk));
