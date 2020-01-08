import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthorsFailed(error) {
  return {
    type: types.LOAD_AUTHORS_FAILURE,
    error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  };
}

export function loadAuthors() {
  return async function(dispatch) {
    try {
      dispatch(beginApiCall());
      const authors = await authorApi.getAuthors();

      dispatch(loadAuthorsSuccess(authors));
    } catch (err) {
      dispatch(loadAuthorsFailed(err));
      throw err;
    }
  };
}
