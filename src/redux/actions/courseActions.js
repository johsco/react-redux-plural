import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall } from "./apiStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSES_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSES_SUCCESS, course };
}

export function createCourseFailure() {
  return { type: types.CREATE_COURSES_FAILURE };
}

export function deleteCourseOptimistically(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function deleteCourseSuccess(course) {
  return { type: types.DELETE_COURSE_SUCCESS, course };
}

export function deleteCourseFailure(course) {
  return { type: types.DELETE_COURSE_FAILURE, course };
}

export function loadCourses() {
  return async function(dispatch) {
    dispatch(beginApiCall());

    const courses = await courseApi.getCourses();

    dispatch(loadCoursesSuccess(courses));
  };
}

export function deleteCourse(course) {
  return async function(dispatch) {
    dispatch(deleteCourseOptimistically(course));

    try {
      await courseApi.deleteCourse(course.id);

      dispatch(deleteCourseSuccess(course));
    } catch (e) {
      dispatch(deleteCourseFailure(course));
      throw e;
    }
  };
}

export function saveCourse(course) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const savedCourse = await courseApi.saveCourse(course);

      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    } catch (e) {
      dispatch(createCourseFailure());
      throw e;
    }
  };
}
