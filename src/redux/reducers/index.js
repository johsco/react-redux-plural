import { combineReducers } from "redux";

import courses from "./courseReducer";
import authors from "./authorReducer";
import error from "./errorReducer";
import apiCallsInProgress from "./apiCallStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  error,
  apiCallsInProgress
});

export default rootReducer;
