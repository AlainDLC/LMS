import { Button } from "@/components/ui/button";
import React from "react";

function CourseEnrollSection() {
  const membership = false;
  return (
    <div className="p-3 text-center rounded-sm bg-primary ">
      {membership ? (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-[18px] font-bold text-white">
            Enroll to the course
          </h2>
          <Button className="bg-white text-primary hover:bg-white hover:text-primary">
            Enroll now
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-[18px] font-bold text-white ">
            Buy Monthly Membership now
          </h2>
          <Button className="bg-white text-primary hover:bg-white hover:text-primary">
            Membership just 3.99$
          </Button>
        </div>
      )}
    </div>
  );
}

export default CourseEnrollSection;
