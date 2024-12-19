import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  return (
    <div className="flex gap-5 items-center bg-white rounded-xl p-5">
      <Image src="/testa.jpg" height={100} width={100} alt="testa" />
      <div>
        <h2 className="font-bold text-[24px]">
          Just have fun and <span className="text-primary">Dance </span>
        </h2>
        <h2 className="text-gray-500">Explore now!!</h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
