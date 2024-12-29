"use client";
import { Lock, Play } from "lucide-react";
import React, { useState } from "react";

function CourseContentSection({
  courseInfo,
  isUserAlreadyEnrolled,
  watchMode = false,
  setActiveChapterIndex,
  completedChapter,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const checkIsChapterCompleted = (chapterId) => {
    return completedChapter.find((item) => item.chapterId == chapterId);
  };

  return (
    <div className="p-3 bg-white rounded-sm mt-3">
      <h2>Content</h2>
      {courseInfo?.chapter.map((item, index) => (
        <div>
          <h2
            className={`p-2 text-[14px] flex items-center justify-between border rounded-sm px-4 cursor-pointer m-2 hover:bg-gray-200 hover:text-gray-500 ${
              activeIndex == index && "bg-primary text-white"
            } ${isUserAlreadyEnrolled && "hover:bg-primary hover:text-white"} ${
              watchMode &&
              checkIsChapterCompleted(item.id) &&
              "border-green-600 bg-green-300"
            }`}
            onClick={() => {
              watchMode && setActiveChapterIndex(index);
              watchMode && setActiveIndex(index);
            }}
          >
            {index + 1}. {item.name}
            {activeIndex == index || isUserAlreadyEnrolled ? (
              <Play className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default CourseContentSection;
