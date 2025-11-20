
import React from "react";


const TabLayout = ({ children }: { children: React.ReactNode }) => {
  return (

      <div className="w-full ">
          <div className="p-5">
            <main>{children}</main>
          </div>
      </div>
    
  
  );
};

export default TabLayout;