"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import SideBanners from "../courses/_components/SideBanners";
import WelcomeBannerDashboard from "./_components/WelcomeBannerDashboard";
import InProgressCourseList from "./_components/InProgressCourseList";
import GlobalApi from "@/app/_utils/GlobalApi";

function DashBoard() {
  const { user, isLoaded } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);

  useEffect(() => {
    isLoaded && user && getallUserEnrolledCourses();
  }, [user, isLoaded]);

  const getallUserEnrolledCourses = () => {
    GlobalApi.getUserAllEnrolledCourseList(
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      console.log(resp);
      setUserEnrolledCourses(resp.userEnrollCourses);
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-5">
      <div className="col-span-3">
        <WelcomeBannerDashboard user={user} />
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses} />
      </div>
      <div className="p-5 bg-white rounded-xl">
        <SideBanners />
      </div>
    </div>
  );
}

export default DashBoard;
