import { Toaster } from "@/components/ui/toaster";
import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

function Layout({ children }) {
  return (
    <>
      <div>
        <div className="hidden sm:w-64  sm:block fixed ">
          <SideNav />
        </div>
        <div className="sm:ml-64 ">
          <Toaster />
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
