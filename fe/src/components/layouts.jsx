import React from "react";

function Layouts({ children }) {
  return <div className="flex mx-auto max-w-md min-h-screen">{children}</div>;
}

export default Layouts;
