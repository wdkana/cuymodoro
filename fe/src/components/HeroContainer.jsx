import React from "react";

function HeroContainer({ children }) {
  return (
    <div className="hero">
      <div className="flex flex-col gap-4 w-full md:max-w-xl md:px-8 px-2">
        {children}
      </div>
    </div>
  );
}

export default HeroContainer;
