import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.error, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_FAILURE:
      debugger;
      return action.error;
    default:
      return state;
  }
}
