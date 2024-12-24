"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SideBanners() {
  const [sideBannerList, setSideBannerList] = useState();

  useEffect(() => {
    getSideBanners();
  }, []);

  const getSideBanners = () => {
    GlobalApi.getSideBanner().then((resp) => {
      setSideBannerList(resp?.sideBanners);
    });
  };
  return (
    <div>
      {sideBannerList?.map((item, index) => (
        <div key={index}>
          <Image
            src={item.banner.url}
            width={500}
            height={300}
            alt="banner"
            onClick={() => window.open(item?.url)}
            className="rounded-xl    hover:shadow-purple-300 hover:shadow-md cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}

export default SideBanners;
