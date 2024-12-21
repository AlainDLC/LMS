"use client";
import Image from "next/image";
import React from "react";

function CourseItem({ course }) {
  const check = course?.chapter?.length == 0;
  return (
    <div className="border rounded-xl hover:shadow-purple-300 hover:shadow-md cursor-pointer">
      <Image
        src={course?.banner?.url}
        width={100}
        height={150}
        alt="banner"
        className="rounded-t-xl"
      />
      <div className="flex flex-col gap-1 p-2">
        <h2 className="font-medium">{course.name}</h2>
        <h2 className="text-[12px] text-gray-500">{course.author}</h2>

        <div className="flex gap-2">
          <Image
            src={check ? "/youtube.png" : "/play.png"}
            width={20}
            height={20}
            alt={check ? "Youtube" : "Chapter"}
          />
          <h2 className="text-[14px] text-gray-500">
            {check ? "What on Youtube" : "Chapter"}
          </h2>
        </div>

        <h2 className="text-[15px]">{course.free ? "Free" : "Paid"}</h2>
      </div>
    </div>
  );
}

export default CourseItem;
