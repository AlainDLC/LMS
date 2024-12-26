import React from "react";
import VideoPlayer from "./VideoPlayer";
import Markdown from "react-markdown";

function CourseVideoDescription({ courseInfo }) {
  const videocourses = courseInfo?.chapter[0]?.video?.url;

  return (
    courseInfo && (
      <div>
        <h2 className="text-[20px] font-semibold">{courseInfo?.name}</h2>
        <h2 className="text-[14px] text-gray-500 mb-3">{courseInfo?.author}</h2>

        <VideoPlayer videoUrl={videocourses} />
        <h2 className=" mt-5 text-[17px] font-semibold">About This Course</h2>

        <Markdown className="text-[11px] font-light mt-2 leading-5">
          {courseInfo.description}
        </Markdown>
      </div>
    )
  );
}

export default CourseVideoDescription;
