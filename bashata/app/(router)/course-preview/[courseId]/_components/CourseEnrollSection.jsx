"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

function CourseEnrollSection({ courseInfo, isUserAlreadyEnrolled }) {
  const membership = false;
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("inloggad", isUserAlreadyEnrolled);
  }, [isUserAlreadyEnrolled]);

  const onEnrollCourse = () => {
    GlobalApi.enrollToCourse(
      courseInfo?.slug,
      user?.primaryEmailAddress?.emailAddress
    ).then((resp) => {
      if (resp) {
        toast({
          title: "User Enrolled Successfully",
        });

        router.push("/watch-course/" + resp.createUserEnrollCourse.id);
      }
    });
  };

  return (
    <div className="p-3 text-center rounded-sm bg-primary">
      {isLoaded &&
      user &&
      (membership || courseInfo?.free) &&
      !isUserAlreadyEnrolled ? (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-[18px] font-bold text-white">
            Enroll to the course
          </h2>
          <Button
            className="bg-white text-primary hover:bg-white hover:text-primary"
            onClick={() => onEnrollCourse()}
          >
            Enroll now
          </Button>
        </div>
      ) : !user ? (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-[18px] font-bold text-white">
            Enroll to the course
          </h2>
          <Link href={"/sign-in"}>
            <Button className="bg-white text-primary hover:bg-white hover:text-primary">
              Enroll now
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {!isUserAlreadyEnrolled && (
            <div className="flex flex-col gap-3 mt-3">
              <h2 className="text-[18px] font-bold text-white">
                Buy Monthly Membership now
              </h2>
              <Button className="bg-white text-primary hover:bg-white hover:text-primary">
                Membership just 3.99$
              </Button>
            </div>
          )}
          {isUserAlreadyEnrolled && (
            <div className="flex flex-col gap-3 mt-3">
              <h2 className="text-[18px] font-bold text-white">
                Continue to Learn
              </h2>
              <Link href={"/watch-course/" + isUserAlreadyEnrolled}>
                <Button className="bg-white text-primary hover:bg-white hover:text-primary">
                  Continue
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CourseEnrollSection;
