import { Lock } from "lucide-react";
import React from "react";

function CourseContentSection({ courseInfo }) {
  const chapter = courseInfo?.chapter;

  console.log(chapter);

  // Om chapter är en array, mappa över den, annars visa enskilt kapitel
  if (Array.isArray(chapter) && chapter.length > 0) {
    return (
      <div className="p-3 bg-white rounded-sm">
        <h2 className="text-xl font-bold mb-3">Course Contents</h2>
        {chapter.map((item, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold">{item.name}</h2>
          </div>
        ))}
      </div>
    );
  }

  // Om chapter inte är en array, visa ett kapitel direkt
  if (chapter && chapter.name) {
    return (
      <div className="p-3 bg-white rounded-sm">
        <h2 className="text-xl font-bold mb-3">Course Content</h2>
        <div
          className="p-2 text-[14px] flex justify-between items-center border rounded-sm px-4 cursor-pointer mt-2
        hover:bg-gray-200 hover:text-gray-500"
        >
          <h2>
            {chapter.id.length}. {chapter.name}
          </h2>
          <Lock className="h-4 w-4" />
        </div>
      </div>
    );
  }

  // Om inget kapitel finns
  return <p>No chapter data available.</p>;
}

export default CourseContentSection;