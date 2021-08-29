import React, { useEffect, useState } from 'react';
import courseStore from "../stores/courseStore";
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { toast } from 'react-toastify';

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleDeleteCourse(id) {
    deleteCourse(id).then(() => {
      toast.success('Course deleted.');
    })
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">Add course</Link>
      <CourseList courses={courses} onDeleteCourse={handleDeleteCourse} />
    </>
  );
}

export default CoursesPage;