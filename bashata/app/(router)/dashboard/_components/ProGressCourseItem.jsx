import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProgressCourseItem({ course }) {
  const getTotalCompletedChapterPerc = (item) => {
    if (!item.completedChapter?.length || !item.courseList?.chapter?.length) {
      return 0;
    }

    // Kolla andelen genomförda kapitel
    const perc =
      (item.completedChapter.length / item.courseList.chapter.length) * 10;

    // Avrunda till närmaste heltal
    return Math.round(perc); // Returnera korrekt procent
  };
  return (
    <Link href={"/course-preview/" + course.courseList?.slug}>
      <div className="border rounded-xl hover:shadow-purple-300 hover:shadow-md cursor-pointer">
        <Image
          src={course?.courseList?.banner?.url}
          width={100}
          height={150}
          alt="banner"
          className="rounded-t-xl"
        />
        <div className="flex flex-col gap-1 p-2">
          <h2 className="font-medium">{course.courseList?.name}</h2>
          <h2 className="text-[12px] text-gray-500">
            {course.courseList?.author}
          </h2>
          <h2 className="text-[12px] text-slate-500 mt-3">
            {getTotalCompletedChapterPerc(course)}%
            <span className="float-right">
              {course.courseList?.chapter?.length} /{" "}
              {course.completedChapter?.length}
            </span>
          </h2>
          <Progress
            value={getTotalCompletedChapterPerc(course)}
            className="h-[7px]"
          />
        </div>
      </div>
    </Link>
  );
}

export default ProgressCourseItem;
