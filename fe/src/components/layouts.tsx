import React from "react";

interface ILayoutsProps {
  children: React.ReactNode;
}
function Layouts({ children }: ILayoutsProps) {
  return <div className="flex mx-auto max-w-5xl min-h-screen">{children}</div>;
}

export default Layouts;
