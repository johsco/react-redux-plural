import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSES_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSES_SUCCESS, course };
}

export function loadCourses() {
  return async function(dispatch) {
    const courses = await courseApi.getCourses();

    dispatch(loadCoursesSuccess(courses));
  };
}

export function saveCourse(course) {
  return async function(dispatch) {
    const savedCourse = await courseApi.saveCourse(course);

    course.id
      ? dispatch(updateCourseSuccess(savedCourse))
      : dispatch(createCourseSuccess(savedCourse));
  };
}
