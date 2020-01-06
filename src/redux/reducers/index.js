import { combineReducers } from "redux";

import courses from "./courseReducer";
import authors from "./authorReducer";
import error from "./errorReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  error
});

export default rootReducer;
