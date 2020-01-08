import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

function actionTypeEndsInFailure(type) {
  return type.substring(type.length - 8) === "_FAILURE";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    actionTypeEndsInFailure(action.type)
  ) {
    return state > 0 ? state - 1 : 0;
  }

  return state;
}
