import * as types from "./actionTypes";

export function CreateCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
