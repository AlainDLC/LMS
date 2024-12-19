"use client";
import Image from "next/image";
import React from "react";

function CourseItem({ course }) {
  return (
    <div>
      <Image
        src={course?.banner?.url}
        width={100}
        height={150}
        alt="banner"
        className="rounded-t-xl"
      />
      <h2 className="font-medium">{course.name}</h2>
      <h2 className="text-[12px] text-gray-500">{course.author}</h2>
    </div>
  );
}

export default CourseItem;
