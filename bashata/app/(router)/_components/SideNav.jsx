"use client";
import { useUser } from "@clerk/nextjs";
import {
  BadgeIcon,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  Mail,
  SquareMenu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function SideNav() {
  const { user, isLoaded } = useUser();
  const menu = [
    {
      id: 8,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      auth: user,
    },
    {
      id: 1,
      name: "All Courses",
      icon: BookOpen,
      path: "/courses",
      auth: true,
    },
    {
      id: 2,
      name: "Membership",
      icon: BadgeIcon,
      path: "/membership",
      auth: true,
    },
    {
      id: 3,
      name: "Be Instructor",
      icon: GraduationCap,
      path: "/instructor",
      auth: true,
    },
    {
      id: 4,
      name: "Store",
      icon: LayoutGrid,
      path: "/store",
      auth: true,
    },
    {
      id: 5,
      name: "NewsLetter",
      icon: Mail,
      path: "/newsLetter",
      auth: true,
    },
  ];
  const path = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  return (
    <div className="p-5 bg-white shadow-sm border h-screen  overflow-y-scroll scrollbar-hide ">
      <div className="flex justify-end items-end mt-2">
        <SquareMenu
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        />
      </div>
      <Image priority src="/kaw.jpg" alt="kawa" width={70} height={50} />

      <hr className="mt-8"></hr>

      {isMenuVisible && (
        <div className="mt-5">
          {menu.map(
            (item, index) =>
              item.auth &&
              isLoaded && (
                <Link href={item.path} key={index}>
                  <div
                    key={index}
                    className={`group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-primary
            hover:text-white rounded-md transition-all ease-out duration-200 ${
              path.includes(item.path) && "bg-primary text-white"
            }`}
                  >
                    <item.icon className="group-hover:animate-bounce" />
                    <h2>{item.name}</h2>
                  </div>
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default SideNav;
