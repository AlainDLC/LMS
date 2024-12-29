"use client";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

function CourseVideoDescription({
  courseInfo,
  activeChapterIndex,
  watchMode = false,
  setChapterCompleted,
}) {
  const videocourses = courseInfo?.chapter[activeChapterIndex]?.video?.url;

  return (
    courseInfo && (
      <div>
        <h2 className="text-[20px] font-semibold">{courseInfo?.name}</h2>
        <h2 className="text-[14px] text-gray-500 mb-3">{courseInfo?.author}</h2>

        <VideoPlayer
          videoUrl={videocourses}
          poster={!watchMode ? courseInfo?.banner?.url : null}
        />
        <h2 className=" mt-5 text-[17px] font-semibold">
          {watchMode ? (
            <span className="flex items-center justify-between">
              {courseInfo?.chapter[activeChapterIndex]?.name}
              <Button
                onClick={() =>
                  setChapterCompleted(
                    courseInfo?.chapter[activeChapterIndex]?.id
                  )
                }
              >
                Mark Completed
              </Button>
            </span>
          ) : (
            <span>About This Course</span>
          )}
        </h2>
        {watchMode ? (
          <Markdown className="text-[11px] font-light mt-2 leading-5">
            {courseInfo?.chapter[activeChapterIndex]?.shortDesc}
          </Markdown>
        ) : (
          <Markdown className="text-[11px] font-light mt-2 leading-5">
            {courseInfo.description}
          </Markdown>
        )}
      </div>
    )
  );
}

export default CourseVideoDescription;
