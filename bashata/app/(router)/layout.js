import React from "react";
import SideNav from "./_components/SideNav";

function Layout({ children }) {
  return (
    <>
      <div>
        <div className="sm:w-64  sm:block fixed ">
          <SideNav />
        </div>
        <div className="sm:ml-64 ">{children}</div>
      </div>
    </>
  );
}

export default Layout;
