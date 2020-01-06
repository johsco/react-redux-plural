import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthorsFailed(error) {
  return {
    type: types.LOAD_AUTHORS_FAILED,
    error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  };
}

export function loadAuthors() {
  return async function(dispatch) {
    try {
      const authors = await authorApi.getAuthors();

      dispatch(loadAuthorsSuccess(authors));
    } catch (err) {
      dispatch(loadAuthorsFailed(err));
      throw err;
    }
  };
}
