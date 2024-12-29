import Image from "next/image";
import React from "react";

function WelcomeBannerDashboard({ user }) {
  return (
    <div className="bg-purple-100 rounded-sm flex gap-5 items-center">
      <Image src={"/kaw.jpg"} alt="kaw" width={150} height={150} />
      <div>
        <h2 className="text-[32px] font-light">Welcome Back</h2>
        <span className="font-bold text-primary">{user?.fullName}</span>
        <h2 className="text-[16px] font-light">Lets Begin Keep it up</h2>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
