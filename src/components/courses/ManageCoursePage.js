import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getData();
  }, [props.course]);

  async function getData() {
    if (courses.length === 0) {
      try {
        await loadCourses();
      } catch (e) {
        alert("Loading courses failed" + e);
      }
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      try {
        await loadAuthors();
      } catch (e) {
        alert("Loading courses failed" + e);
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const error = {};

    if (!course.title) error.title = "Title is required";
    if (!course.authorId) error.authorId = "Author is required";
    if (!course.category) error.category = "Category is required";

    setErrors(error);

    return Object.keys(error).length === 0;
  }

  async function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    try {
      await saveCourse(course);

      toast.success("Course Saved");
      history.push("/courses");
    } catch (e) {
      setSaving(false);
      setErrors({ onSave: e.message });
    }
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
  return courses.find(x => x.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug ? getCourseBySlug(state.courses, slug) : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
