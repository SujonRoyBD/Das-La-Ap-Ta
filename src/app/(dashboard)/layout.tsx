import React from "react";
import DashboardHeader from "./dashboard/_conponents/dashboard-header";
import Sidebar from "./dashboard/_conponents/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
   
      <div className="w-full flex ">
        <div>
          <div>
            
          </div>
          <div>
          <Sidebar />
        </div>
        </div>
      <div className="w-full ">
           <div className="w-full">
            <DashboardHeader/>
           </div>
          <div className="p-5">
            <main>{children}</main>
          </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;