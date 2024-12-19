"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect } from "react";

function CourseList() {
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    GlobalApi.getAllCourseList().then((resp) => {
      console.log(resp);
    });
  };

  return <div>CourseList</div>;
}

export default CourseList;
